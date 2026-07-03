import { Readable } from "node:stream";
import { describe, expect, it } from "vitest";
import { normalizeHeader, processCsvStream } from "./csvProcessor.js";

function streamFromCsv(csv: string) {
    return Readable.from([csv]);
}

describe("csvProcessor", () => {
    it("normalizes CSV headers", () => {
        expect(normalizeHeader("Signup Date")).toBe("signup_date");
        expect(normalizeHeader(" Revenue ($) ")).toBe("revenue");
    });

    it("processes rows, skips empty rows, and infers column types", async () => {
        const insertedBatches: unknown[] = [];

        const summary = await processCsvStream(
            streamFromCsv(
                [
                    "revenue,country,signup_date,is_repeat",
                    "1200,United States,2026-01-12,true",
                    "",
                    "2400,Canada,2026-01-19,false",
                    "1800,United States,2026-02-01,true"
                ].join("\n")
            ),
            async (rows) => {
                insertedBatches.push(rows);
            }
        );

        expect(summary.totalRowsReceived).toBe(4);
        expect(summary.rowsInserted).toBe(3);
        expect(summary.rowsSkipped).toBe(1);
        expect(summary.skipReasons.empty_row).toBe(1);
        expect(summary.columnsDetected).toBe(4);
        expect(summary.inferredColumns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    normalized_name: "revenue",
                    type: "number"
                }),
                expect.objectContaining({
                    normalized_name: "country",
                    type: "category"
                }),
                expect.objectContaining({
                    normalized_name: "signup_date",
                    type: "date"
                }),
                expect.objectContaining({
                    normalized_name: "is_repeat",
                    type: "boolean"
                })
            ])
        );
        expect(insertedBatches).toHaveLength(1);
    });

    it("reports duplicate headers as skipped upload input", async () => {
        const summary = await processCsvStream(
            streamFromCsv("Revenue,revenue\n1200,1300"),
            async () => {
                throw new Error("Should not insert rows for invalid headers");
            }
        );

        expect(summary.rowsInserted).toBe(0);
        expect(summary.rowsSkipped).toBe(1);
        expect(summary.skipReasons.duplicate_header).toBe(1);
    });
});
