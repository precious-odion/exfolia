import { z } from "zod";

export const ColumnTypeSchema = z.enum([
    "text",
    "number",
    "date",
    "boolean",
    "category"
]);

export type ColumnType = z.infer<typeof ColumnTypeSchema>;

export const DatasetStatusSchema = z.enum([
    "processing",
    "ready",
    "failed"
]);

export type DatasetStatus = z.infer<typeof DatasetStatusSchema>;

export const DatasetSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    original_filename: z.string().min(1),
    file_size: z.number().int().nonnegative(),
    row_count: z.number().int().nonnegative(),
    status: DatasetStatusSchema,
    created_at: z.string(),
    updated_at: z.string()
});

export type Dataset = z.infer<typeof DatasetSchema>;

export const DatasetColumnSchema = z.object({
    id: z.string().uuid(),
    dataset_id: z.string().uuid(),
    name: z.string().min(1),
    normalized_name: z.string().min(1),
    type: ColumnTypeSchema,
    position: z.number().int().nonnegative(),
    nullable: z.boolean(),
    unique_count: z.number().int().nonnegative().optional(),
    sample_values: z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])).default([])
});

export type DatasetColumn = z.infer<typeof DatasetColumnSchema>;

export const CellValueSchema = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null()
]);

export type CellValue = z.infer<typeof CellValueSchema>;

export const DatasetRowSchema = z.object({
    id: z.string().uuid(),
    dataset_id: z.string().uuid(),
    row_index: z.number().int().nonnegative(),
    data: z.record(z.string(), CellValueSchema),
    created_at: z.string()
});

export type DatasetRow = z.infer<typeof DatasetRowSchema>;

export const UploadSkipReasonSchema = z.enum([
    "empty_row",
    "bad_csv_format",
    "missing_header",
    "duplicate_header",
    "invalid_row",
    "unsupported_file_type",
    "file_too_large"
]);

export type UploadSkipReason = z.infer<typeof UploadSkipReasonSchema>;

export const UploadSkipReasonsSchema = z
    .object({
        empty_row: z.number().int().nonnegative().optional(),
        bad_csv_format: z.number().int().nonnegative().optional(),
        missing_header: z.number().int().nonnegative().optional(),
        duplicate_header: z.number().int().nonnegative().optional(),
        invalid_row: z.number().int().nonnegative().optional(),
        unsupported_file_type: z.number().int().nonnegative().optional(),
        file_too_large: z.number().int().nonnegative().optional()
    })
    .strict()
    .default({});

export type UploadSkipReasons = z.infer<typeof UploadSkipReasonsSchema>;

export const InferredColumnSchema = z.object({
    name: z.string().min(1),
    normalized_name: z.string().min(1),
    type: ColumnTypeSchema
});

export type InferredColumn = z.infer<typeof InferredColumnSchema>;

export const UploadSummarySchema = z.object({
    status: z.enum(["success", "failed"]),
    dataset_id: z.string().uuid().optional(),
    total_rows_received: z.number().int().nonnegative(),
    rows_inserted: z.number().int().nonnegative(),
    rows_skipped: z.number().int().nonnegative(),
    columns_detected: z.number().int().nonnegative(),
    inferred_columns: z.array(InferredColumnSchema),
    skip_reasons: UploadSkipReasonsSchema,
    message: z.string().optional()
});

export type UploadSummary = z.infer<typeof UploadSummarySchema>;

export const QueryCombinatorSchema = z.enum(["AND", "OR"]);

export type QueryCombinator = z.infer<typeof QueryCombinatorSchema>;

export const RuleOperatorSchema = z.enum([
    "eq",
    "neq",
    "contains",
    "starts_with",
    "ends_with",
    "gt",
    "gte",
    "lt",
    "lte",
    "between",
    "before",
    "after",
    "on",
    "is_empty",
    "is_not_empty",
    "is_true",
    "is_false"
]);

export type RuleOperator = z.infer<typeof RuleOperatorSchema>;

export const PrimitiveQueryValueSchema = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null()
]);

export const QueryValueSchema = z.union([
    PrimitiveQueryValueSchema,
    z.tuple([PrimitiveQueryValueSchema, PrimitiveQueryValueSchema])
]);

export type QueryValue = z.infer<typeof QueryValueSchema>;

export const QueryRuleSchema = z.object({
    id: z.string().min(1),
    type: z.literal("rule"),
    field: z.string().min(1),
    operator: RuleOperatorSchema,
    value: QueryValueSchema.optional()
});

export type QueryRule = z.infer<typeof QueryRuleSchema>;

export type QueryGroup = {
    id: string;
    type: "group";
    combinator: QueryCombinator;
    children: QueryNode[];
};

export type QueryNode = QueryRule | QueryGroup;

export const QueryNodeSchema: z.ZodType<QueryNode> = z.lazy(() =>
    z.union([QueryRuleSchema, QueryGroupSchema])
);

export const QueryGroupSchema: z.ZodType<QueryGroup> = z.object({
    id: z.string().min(1),
    type: z.literal("group"),
    combinator: QueryCombinatorSchema,
    children: z.array(QueryNodeSchema)
});

export const QueryRequestSchema = z.object({
    dataset_id: z.string().uuid(),
    query_tree: QueryNodeSchema,
    limit: z.number().int().positive().max(100).default(100),
    offset: z.number().int().nonnegative().default(0),
    sort: z
        .object({
            field: z.string().min(1),
            direction: z.enum(["asc", "desc"])
        })
        .optional()
});

export type QueryRequest = z.infer<typeof QueryRequestSchema>;

export const QueryResponseSchema = z.object({
    dataset_id: z.string().uuid(),
    rows: z.array(DatasetRowSchema),
    total: z.number().int().nonnegative(),
    limit: z.number().int().positive(),
    offset: z.number().int().nonnegative()
});

export type QueryResponse = z.infer<typeof QueryResponseSchema>;

export const ChartTypeSchema = z.enum([
    "kpi",
    "bar",
    "pie",
    "donut",
    "histogram",
    "line"
]);

export type ChartType = z.infer<typeof ChartTypeSchema>;

export const ChartConfigSchema = z.object({
    id: z.string().min(1),
    type: ChartTypeSchema,
    title: z.string().min(1),
    config: z.record(z.unknown()).default({})
});

export type ChartConfig = z.infer<typeof ChartConfigSchema>;

export const WorkspaceSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    dataset_id: z.string().uuid(),
    query_tree: QueryNodeSchema,
    chart_config: z.array(ChartConfigSchema).default([]),
    table_config: z.record(z.unknown()).default({}),
    created_at: z.string(),
    updated_at: z.string()
});

export type Workspace = z.infer<typeof WorkspaceSchema>;

export const AiProviderSchema = z.enum(["gemini", "groq"]);

export type AiProvider = z.infer<typeof AiProviderSchema>;

export const AiInsightRequestSchema = z.object({
    workspace_id: z.string().uuid().optional(),
    dataset_id: z.string().uuid(),
    prompt: z.string().min(1),
    context: z.object({
        dataset_name: z.string().min(1),
        row_count: z.number().int().nonnegative(),
        columns: z.array(
            z.object({
                name: z.string().min(1),
                type: ColumnTypeSchema
            })
        ),
        current_filter_preview: z.string().optional(),
        chart_summaries: z.array(z.record(z.unknown())).default([])
    })
});

export type AiInsightRequest = z.infer<typeof AiInsightRequestSchema>;

export const AiInsightResponseSchema = z.object({
    id: z.string().uuid().optional(),
    provider: AiProviderSchema,
    model: z.string().min(1),
    response: z.string().min(1),
    created_at: z.string().optional()
});

export type AiInsightResponse = z.infer<typeof AiInsightResponseSchema>;