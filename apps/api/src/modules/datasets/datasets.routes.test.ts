import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildApp } from "../../app.js";
import { getDb } from "../../db/connection.js";
import { getDatasetPreview } from "./datasets.repository.js";

vi.mock("../../db/connection.js", () => ({
    getDb: vi.fn()
}));

vi.mock("./datasets.repository.js", async (importOriginal) => {
    const actual = await importOriginal<typeof import("./datasets.repository.js")>();

    return {
        ...actual,
        getDatasetPreview: vi.fn()
    };
});

const mockedGetDb = vi.mocked(getDb);
const mockedGetDatasetPreview = vi.mocked(getDatasetPreview);

function multipartBody({
    boundary,
    fieldName,
    filename,
    contentType,
    content
}: {
    boundary: string;
    fieldName: string;
    filename: string;
    contentType: string;
    content: string;
}) {
    return [
        `--${boundary}`,
        `Content-Disposition: form-data; name="${fieldName}"; filename="${filename}"`,
        `Content-Type: ${contentType}`,
        "",
        content,
        `--${boundary}--`,
        ""
    ].join("\r\n");
}

beforeEach(() => {
    vi.clearAllMocks();
    mockedGetDb.mockReturnValue({} as ReturnType<typeof getDb>);
});

describe("POST /api/datasets/upload", () => {
    it("rejects requests without a CSV file", async () => {
        const app = buildApp();

        const response = await app.inject({
            method: "POST",
            url: "/api/datasets/upload"
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toMatchObject({
            status: "failed",
            message: "CSV file is required."
        });

        await app.close();
    });

    it("rejects non-CSV uploads before touching the database", async () => {
        const app = buildApp();
        const boundary = "----exfolia-test-boundary";

        const response = await app.inject({
            method: "POST",
            url: "/api/datasets/upload",
            headers: {
                "content-type": `multipart/form-data; boundary=${boundary}`
            },
            payload: multipartBody({
                boundary,
                fieldName: "file",
                filename: "notes.txt",
                contentType: "text/plain",
                content: "hello"
            })
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toMatchObject({
            status: "failed",
            message: "Only CSV files are supported."
        });

        await app.close();
    });
});

describe("GET /api/datasets/:datasetId/preview", () => {
    it("rejects invalid dataset ids", async () => {
        const app = buildApp();

        const response = await app.inject({
            method: "GET",
            url: "/api/datasets/not-a-uuid/preview"
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toEqual({
            status: "failed",
            message: "Invalid dataset id."
        });
        expect(mockedGetDatasetPreview).not.toHaveBeenCalled();

        await app.close();
    });

    it("returns 404 when the dataset does not exist", async () => {
        const app = buildApp();
        mockedGetDatasetPreview.mockResolvedValueOnce(null);

        const response = await app.inject({
            method: "GET",
            url: "/api/datasets/550e8400-e29b-41d4-a716-446655440000/preview"
        });

        expect(response.statusCode).toBe(404);
        expect(response.json()).toEqual({
            status: "failed",
            message: "Dataset not found."
        });

        await app.close();
    });

    it("returns dataset columns, rows, and pagination", async () => {
        const app = buildApp();

        mockedGetDatasetPreview.mockResolvedValueOnce({
            dataset: {
                id: "550e8400-e29b-41d4-a716-446655440000",
                name: "small-sales",
                original_filename: "small-sales.csv",
                file_size: 120,
                row_count: 3,
                status: "ready",
                created_at: "2026-07-03T10:00:00.000Z",
                updated_at: "2026-07-03T10:00:00.000Z"
            },
            columns: [
                {
                    id: "650e8400-e29b-41d4-a716-446655440000",
                    name: "revenue",
                    normalized_name: "revenue",
                    type: "number",
                    position: 0,
                    nullable: false,
                    unique_count: 3,
                    sample_values: [1200, 2400, 1800]
                }
            ],
            rows: [
                {
                    id: "750e8400-e29b-41d4-a716-446655440000",
                    row_index: 0,
                    data: {
                        revenue: 1200,
                        country: "United States"
                    },
                    created_at: "2026-07-03T10:00:00.000Z"
                }
            ],
            pagination: {
                limit: 25,
                offset: 0,
                total: 3
            }
        });

        const response = await app.inject({
            method: "GET",
            url: "/api/datasets/550e8400-e29b-41d4-a716-446655440000/preview?limit=25&offset=0"
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toMatchObject({
            dataset: {
                id: "550e8400-e29b-41d4-a716-446655440000",
                row_count: 3
            },
            columns: [
                {
                    normalized_name: "revenue",
                    type: "number",
                    sample_values: [1200, 2400, 1800]
                }
            ],
            pagination: {
                limit: 25,
                offset: 0,
                total: 3
            }
        });
        expect(mockedGetDatasetPreview).toHaveBeenCalledWith(
            {},
            "550e8400-e29b-41d4-a716-446655440000",
            {
                limit: 25,
                offset: 0
            }
        );

        await app.close();
    });
});
