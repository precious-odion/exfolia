import type { Knex } from "knex";
import type { InferredCsvColumn, ProcessedCsvRow } from "./csvProcessor.js";

type DatasetInsert = {
    name: string;
    original_filename: string;
    file_size: number;
};

export async function createProcessingDataset(trx: Knex.Transaction, dataset: DatasetInsert) {
    const rows = await trx("datasets")
        .insert({
            name: dataset.name,
            original_filename: dataset.original_filename,
            file_size: dataset.file_size,
            row_count: 0,
            status: "processing"
        })
        .returning<{ id: string }[]>("id");

    const created = rows[0];

    if (!created) {
        throw new Error("Failed to create dataset");
    }

    return created.id;
}

export async function insertDatasetRows(
    trx: Knex.Transaction,
    datasetId: string,
    rows: ProcessedCsvRow[]
) {
    if (rows.length === 0) return;

    await trx("dataset_rows").insert(
        rows.map((row) => ({
            dataset_id: datasetId,
            row_index: row.rowIndex,
            data: row.data
        }))
    );
}

export async function insertDatasetColumns(
    trx: Knex.Transaction,
    datasetId: string,
    columns: InferredCsvColumn[]
) {
    if (columns.length === 0) return;

    await trx("dataset_columns").insert(
        columns.map((column) => ({
            dataset_id: datasetId,
            name: column.name,
            normalized_name: column.normalized_name,
            type: column.type,
            position: column.position,
            nullable: column.nullable,
            unique_count: column.unique_count,
            sample_values: JSON.stringify(column.sample_values)
        }))
    );
}

export async function markDatasetReady(
    trx: Knex.Transaction,
    datasetId: string,
    rowCount: number
) {
    await trx("datasets")
        .where({ id: datasetId })
        .update({
            row_count: rowCount,
            status: "ready",
            updated_at: trx.fn.now()
        });
}
