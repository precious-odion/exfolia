import { describe, expect, it } from "vitest";
import { buildApp } from "../../app.js";

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
