import type { Knex } from "knex";
import type { CellValue, InferredCsvColumn, ProcessedCsvRow } from "./csvProcessor.js";

type DatasetInsert = {
    name: string;
    original_filename: string;
    file_size: number;
};

type DatasetPreviewPagination = {
    limit: number;
    offset: number;
};

type DatasetRecord = {
    id: string;
    name: string;
    original_filename: string;
    file_size: string | number;
    row_count: number;
    status: string;
    created_at: string | Date;
    updated_at: string | Date;
};

type DatasetColumnRecord = {
    id: string;
    name: string;
    normalized_name: string;
    type: string;
    position: number;
    nullable: boolean;
    unique_count: number | null;
    sample_values: CellValue[] | string | null;
};

type DatasetRowRecord = {
    id: string;
    row_index: number;
    data: Record<string, CellValue>;
    created_at: string | Date;
};

function normalizeJsonbArray(value: DatasetColumnRecord["sample_values"]) {
    if (Array.isArray(value)) return value;
    if (typeof value !== "string") return [];

    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

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

export async function getDatasetPreview(
    db: Knex,
    datasetId: string,
    pagination: DatasetPreviewPagination
) {
    const dataset = await db<DatasetRecord>("datasets")
        .where({ id: datasetId })
        .first([
            "id",
            "name",
            "original_filename",
            "file_size",
            "row_count",
            "status",
            "created_at",
            "updated_at"
        ]);

    if (!dataset) return null;

    const [columns, rows, totalRow] = await Promise.all([
        db<DatasetColumnRecord>("dataset_columns")
            .where({ dataset_id: datasetId })
            .select([
                "id",
                "name",
                "normalized_name",
                "type",
                "position",
                "nullable",
                "unique_count",
                "sample_values"
            ])
            .orderBy("position", "asc"),
        db<DatasetRowRecord>("dataset_rows")
            .where({ dataset_id: datasetId })
            .select(["id", "row_index", "data", "created_at"])
            .orderBy("row_index", "asc")
            .limit(pagination.limit)
            .offset(pagination.offset),
        db("dataset_rows")
            .where({ dataset_id: datasetId })
            .count<{ count: string }>("id as count")
            .first()
    ]);

    return {
        dataset: {
            ...dataset,
            file_size: Number(dataset.file_size)
        },
        columns: columns.map((column) => ({
            ...column,
            unique_count: column.unique_count ?? 0,
            sample_values: normalizeJsonbArray(column.sample_values)
        })),
        rows,
        pagination: {
            limit: pagination.limit,
            offset: pagination.offset,
            total: Number(totalRow?.count ?? 0)
        }
    };
}
