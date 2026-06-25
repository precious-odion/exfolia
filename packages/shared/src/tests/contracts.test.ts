import { describe, expect, it } from "vitest";
import {
    ColumnTypeSchema,
    QueryNodeSchema,
    QueryRequestSchema,
    RuleOperatorSchema,
    UploadSummarySchema
} from "../index.js";

describe("shared contracts", () => {
    it("accepts supported column types", () => {
        expect(ColumnTypeSchema.parse("number")).toBe("number");
        expect(ColumnTypeSchema.parse("category")).toBe("category");
    });

    it("rejects unsupported rule operators", () => {
        expect(() => RuleOperatorSchema.parse("drop_table")).toThrow();
    });

    it("validates an upload summary", () => {
        const summary = UploadSummarySchema.parse({
            status: "success",
            dataset_id: "550e8400-e29b-41d4-a716-446655440000",
            total_rows_received: 100,
            rows_inserted: 95,
            rows_skipped: 5,
            columns_detected: 4,
            inferred_columns: [
                {
                    name: "Revenue",
                    normalized_name: "revenue",
                    type: "number"
                }
            ],
            skip_reasons: {
                empty_row: 5
            }
        });

        expect(summary.rows_inserted).toBe(95);
        expect(summary.inferred_columns[0]?.type).toBe("number");
    });

    it("validates a nested query tree", () => {
        const queryTree = QueryNodeSchema.parse({
            id: "root",
            type: "group",
            combinator: "AND",
            children: [
                {
                    id: "rule-1",
                    type: "rule",
                    field: "revenue",
                    operator: "gt",
                    value: 100000
                },
                {
                    id: "group-1",
                    type: "group",
                    combinator: "OR",
                    children: [
                        {
                            id: "rule-2",
                            type: "rule",
                            field: "region",
                            operator: "eq",
                            value: "Lagos"
                        },
                        {
                            id: "rule-3",
                            type: "rule",
                            field: "region",
                            operator: "eq",
                            value: "Abuja"
                        }
                    ]
                }
            ]
        });

        expect(queryTree.type).toBe("group");

        if (queryTree.type === "group") {
            expect(queryTree.children).toHaveLength(2);
        }
    });

    it("validates a query request with pagination", () => {
        const request = QueryRequestSchema.parse({
            dataset_id: "550e8400-e29b-41d4-a716-446655440000",
            query_tree: {
                id: "root",
                type: "group",
                combinator: "AND",
                children: []
            },
            limit: 50,
            offset: 0
        });

        expect(request.limit).toBe(50);
        expect(request.offset).toBe(0);
    });

    it("rejects query requests with unsafe limits", () => {
        expect(() =>
            QueryRequestSchema.parse({
                dataset_id: "550e8400-e29b-41d4-a716-446655440000",
                query_tree: {
                    id: "root",
                    type: "group",
                    combinator: "AND",
                    children: []
                },
                limit: 1000,
                offset: 0
            })
        ).toThrow();
    });
});