import type { FastifyInstance } from "fastify";
import { getDb } from "../../db/connection.js";
import { processCsvStream, type CsvUploadFailureReason } from "./csvProcessor.js";
import {
    createProcessingDataset,
    insertDatasetColumns,
    insertDatasetRows,
    markDatasetReady
} from "./datasets.repository.js";

const maxCsvUploadBytes = 100 * 1024 * 1024;
const csvMimeTypes = new Set([
    "text/csv",
    "application/csv",
    "application/vnd.ms-excel"
]);

function buildFailedUploadSummary(reason: CsvUploadFailureReason, message: string) {
    return {
        status: "failed",
        total_rows_received: 0,
        rows_inserted: 0,
        rows_skipped: 0,
        columns_detected: 0,
        inferred_columns: [],
        skip_reasons: {
            [reason]: 1
        },
        message
    };
}

function isCsvFile(filename: string, mimetype: string) {
    return filename.toLowerCase().endsWith(".csv") || csvMimeTypes.has(mimetype);
}

function datasetNameFromFilename(filename: string) {
    return filename.replace(/\.csv$/i, "").trim() || "Untitled dataset";
}

export async function registerDatasetRoutes(app: FastifyInstance) {
    app.post("/upload", async (request, reply) => {
        if (!request.isMultipart()) {
            return reply.code(400).send(
                buildFailedUploadSummary("missing_header", "CSV file is required.")
            );
        }

        const file = await request.file();

        if (!file) {
            return reply.code(400).send(
                buildFailedUploadSummary("missing_header", "CSV file is required.")
            );
        }

        if (!isCsvFile(file.filename, file.mimetype)) {
            file.file.resume();

            return reply.code(400).send(
                buildFailedUploadSummary("unsupported_file_type", "Only CSV files are supported.")
            );
        }

        const contentLength = Number(request.headers["content-length"] ?? 0);

        if (contentLength > maxCsvUploadBytes) {
            file.file.resume();

            return reply.code(413).send(
                buildFailedUploadSummary("file_too_large", "CSV uploads must be 100MB or smaller.")
            );
        }

        const db = getDb();

        try {
            const summary = await db.transaction(async (trx) => {
                const datasetId = await createProcessingDataset(trx, {
                    name: datasetNameFromFilename(file.filename),
                    original_filename: file.filename,
                    file_size: contentLength
                });

                const processed = await processCsvStream(file.file, async (rows) => {
                    await insertDatasetRows(trx, datasetId, rows);
                });

                if (processed.rowsInserted === 0 || processed.columnsDetected === 0) {
                    throw Object.assign(new Error("No valid CSV rows were found."), {
                        summary: {
                            status: "failed",
                            dataset_id: datasetId,
                            total_rows_received: processed.totalRowsReceived,
                            rows_inserted: processed.rowsInserted,
                            rows_skipped: processed.rowsSkipped,
                            columns_detected: processed.columnsDetected,
                            inferred_columns: processed.inferredColumns.map((column) => ({
                                name: column.name,
                                normalized_name: column.normalized_name,
                                type: column.type
                            })),
                            skip_reasons: processed.skipReasons,
                            message: "No valid CSV rows were found."
                        }
                    });
                }

                await insertDatasetColumns(trx, datasetId, processed.inferredColumns);
                await markDatasetReady(trx, datasetId, processed.rowsInserted);

                return {
                    status: "success",
                    dataset_id: datasetId,
                    total_rows_received: processed.totalRowsReceived,
                    rows_inserted: processed.rowsInserted,
                    rows_skipped: processed.rowsSkipped,
                    columns_detected: processed.columnsDetected,
                    inferred_columns: processed.inferredColumns.map((column) => ({
                        name: column.name,
                        normalized_name: column.normalized_name,
                        type: column.type
                    })),
                    skip_reasons: processed.skipReasons
                };
            });

            return reply.code(201).send(summary);
        } catch (error) {
            const summary = (error as { summary?: unknown }).summary;

            if (summary) {
                return reply.code(400).send(summary);
            }

            request.log.error(error);

            return reply.code(500).send(
                buildFailedUploadSummary("bad_csv_format", "CSV upload failed.")
            );
        }
    });
}
