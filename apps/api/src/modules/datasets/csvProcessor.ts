import { parse } from "csv-parse";
import type { Readable } from "node:stream";

export type CellValue = string | number | boolean | null;

export type CsvUploadFailureReason =
    | "bad_csv_format"
    | "duplicate_header"
    | "empty_row"
    | "file_too_large"
    | "invalid_row"
    | "missing_header"
    | "unsupported_file_type";

export type ColumnType = "text" | "number" | "date" | "boolean" | "category";

export type ProcessedCsvRow = {
    rowIndex: number;
    data: Record<string, CellValue>;
};

export type InferredCsvColumn = {
    name: string;
    normalized_name: string;
    type: ColumnType;
    position: number;
    nullable: boolean;
    unique_count: number;
    sample_values: CellValue[];
};

export type CsvProcessingSummary = {
    totalRowsReceived: number;
    rowsInserted: number;
    rowsSkipped: number;
    columnsDetected: number;
    inferredColumns: InferredCsvColumn[];
    skipReasons: Partial<Record<CsvUploadFailureReason, number>>;
};

type HeaderInfo = {
    originalName: string;
    normalizedName: string;
};

type ColumnStats = {
    originalName: string;
    normalizedName: string;
    position: number;
    emptyCount: number;
    nonEmptyCount: number;
    numberCount: number;
    booleanCount: number;
    dateCount: number;
    uniqueValues: Set<string>;
    sampleValues: CellValue[];
};

const batchSize = 500;
const maxSampleValues = 5;

function incrementSkipReason(
    skipReasons: Partial<Record<CsvUploadFailureReason, number>>,
    reason: CsvUploadFailureReason
) {
    skipReasons[reason] = (skipReasons[reason] ?? 0) + 1;
}

export function normalizeHeader(header: string) {
    return header
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

function isNumberLike(value: string) {
    if (value.trim() === "") return false;
    return Number.isFinite(Number(value));
}

function isBooleanLike(value: string) {
    return ["true", "false", "yes", "no"].includes(value.trim().toLowerCase());
}

function isDateLike(value: string) {
    if (isNumberLike(value)) return false;

    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp);
}

function parseCellValue(value: unknown): CellValue {
    if (typeof value !== "string") return null;

    const trimmed = value.trim();

    if (trimmed === "") return null;
    if (isBooleanLike(trimmed)) return ["true", "yes"].includes(trimmed.toLowerCase());
    if (isNumberLike(trimmed)) return Number(trimmed);

    return trimmed;
}

function buildHeaders(headers: string[]) {
    const seen = new Set<string>();

    return headers.map((header): HeaderInfo => {
        const originalName = header.trim();
        const normalizedName = normalizeHeader(originalName);

        if (!originalName || !normalizedName) {
            throw Object.assign(new Error("CSV contains a missing header"), {
                reason: "missing_header" satisfies CsvUploadFailureReason
            });
        }

        if (seen.has(normalizedName)) {
            throw Object.assign(new Error(`CSV contains duplicate header: ${originalName}`), {
                reason: "duplicate_header" satisfies CsvUploadFailureReason
            });
        }

        seen.add(normalizedName);

        return {
            originalName,
            normalizedName
        };
    });
}

function createColumnStats(headers: HeaderInfo[]) {
    return headers.map(
        (header, position): ColumnStats => ({
            originalName: header.originalName,
            normalizedName: header.normalizedName,
            position,
            emptyCount: 0,
            nonEmptyCount: 0,
            numberCount: 0,
            booleanCount: 0,
            dateCount: 0,
            uniqueValues: new Set<string>(),
            sampleValues: []
        })
    );
}

function updateColumnStats(stats: ColumnStats, rawValue: string | undefined, parsedValue: CellValue) {
    const trimmedValue = rawValue?.trim() ?? "";

    if (!trimmedValue) {
        stats.emptyCount += 1;
        return;
    }

    stats.nonEmptyCount += 1;
    stats.uniqueValues.add(trimmedValue);

    if (stats.sampleValues.length < maxSampleValues) {
        stats.sampleValues.push(parsedValue);
    }

    if (isNumberLike(trimmedValue)) stats.numberCount += 1;
    if (isBooleanLike(trimmedValue)) stats.booleanCount += 1;
    if (isDateLike(trimmedValue)) stats.dateCount += 1;
}

function inferColumnType(stats: ColumnStats): ColumnType {
    if (stats.nonEmptyCount === 0) return "text";

    const threshold = Math.ceil(stats.nonEmptyCount * 0.8);

    if (stats.booleanCount >= threshold) return "boolean";
    if (stats.numberCount >= threshold) return "number";
    if (stats.dateCount >= threshold) return "date";

    const categoryLimit = Math.min(20, Math.ceil(stats.nonEmptyCount * 0.5));
    if (stats.uniqueValues.size > 0 && stats.uniqueValues.size <= categoryLimit) return "category";

    return "text";
}

function inferColumns(columnStats: ColumnStats[]): InferredCsvColumn[] {
    return columnStats.map((stats) => ({
        name: stats.originalName,
        normalized_name: stats.normalizedName,
        type: inferColumnType(stats),
        position: stats.position,
        nullable: stats.emptyCount > 0,
        unique_count: stats.uniqueValues.size,
        sample_values: stats.sampleValues
    }));
}

export async function processCsvStream(
    stream: Readable,
    onBatch: (rows: ProcessedCsvRow[]) => Promise<void>
): Promise<CsvProcessingSummary> {
    let headers: HeaderInfo[] | null = null;
    let columnStats: ColumnStats[] = [];
    let totalRowsReceived = 0;
    let rowsInserted = 0;
    let batch: ProcessedCsvRow[] = [];

    const skipReasons: Partial<Record<CsvUploadFailureReason, number>> = {};
    const parser = stream.pipe(
        parse({
            bom: true,
            relax_column_count: true,
            trim: true,
            skip_empty_lines: false
        })
    );

    try {
        for await (const record of parser as AsyncIterable<string[]>) {
            if (!headers) {
                headers = buildHeaders(record);
                columnStats = createColumnStats(headers);
                continue;
            }

            const currentRowIndex = totalRowsReceived;
            totalRowsReceived += 1;
            const isEmptyRow = record.every((value) => value.trim() === "");

            if (isEmptyRow) {
                incrementSkipReason(skipReasons, "empty_row");
                continue;
            }

            if (record.length !== headers.length) {
                incrementSkipReason(skipReasons, "invalid_row");
                continue;
            }

            const data: Record<string, CellValue> = {};

            headers.forEach((header, index) => {
                const rawValue = record[index] ?? "";
                const parsedValue = parseCellValue(rawValue);

                data[header.normalizedName] = parsedValue;
                updateColumnStats(columnStats[index], rawValue, parsedValue);
            });

            batch.push({
                rowIndex: currentRowIndex,
                data
            });
            rowsInserted += 1;

            if (batch.length >= batchSize) {
                await onBatch(batch);
                batch = [];
            }
        }

        if (!headers) {
            incrementSkipReason(skipReasons, "missing_header");
        }

        if (batch.length > 0) {
            await onBatch(batch);
        }

        const rowsSkipped = Object.values(skipReasons).reduce((total, count) => total + (count ?? 0), 0);

        return {
            totalRowsReceived,
            rowsInserted,
            rowsSkipped,
            columnsDetected: headers?.length ?? 0,
            inferredColumns: inferColumns(columnStats),
            skipReasons
        };
    } catch (error) {
        const reason = (error as { reason?: CsvUploadFailureReason }).reason ?? "bad_csv_format";
        incrementSkipReason(skipReasons, reason);

        const rowsSkipped = Object.values(skipReasons).reduce((total, count) => total + (count ?? 0), 0);

        return {
            totalRowsReceived,
            rowsInserted,
            rowsSkipped,
            columnsDetected: headers?.length ?? 0,
            inferredColumns: inferColumns(columnStats),
            skipReasons
        };
    }
}
