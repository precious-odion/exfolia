exports.up = async function up(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

    await knex.schema.createTable("datasets", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.text("name").notNullable();
        table.text("original_filename").notNullable();
        table.bigInteger("file_size").notNullable().defaultTo(0);
        table.integer("row_count").notNullable().defaultTo(0);
        table.text("status").notNullable().defaultTo("processing");
        table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());

        table.check("?? in (?, ?, ?)", ["status", "processing", "ready", "failed"]);
    });

    await knex.schema.createTable("dataset_columns", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table
            .uuid("dataset_id")
            .notNullable()
            .references("id")
            .inTable("datasets")
            .onDelete("CASCADE");
        table.text("name").notNullable();
        table.text("normalized_name").notNullable();
        table.text("type").notNullable();
        table.integer("position").notNullable();
        table.boolean("nullable").notNullable().defaultTo(false);
        table.integer("unique_count");
        table.jsonb("sample_values").notNullable().defaultTo(knex.raw("'[]'::jsonb"));
        table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());

        table.unique(["dataset_id", "normalized_name"]);
        table.unique(["dataset_id", "position"]);
        table.index(["dataset_id"]);
        table.index(["type"]);

        table.check("?? >= 0", ["position"]);
        table.check("?? in (?, ?, ?, ?, ?)", [
            "type",
            "text",
            "number",
            "date",
            "boolean",
            "category"
        ]);
    });

    await knex.schema.createTable("dataset_rows", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table
            .uuid("dataset_id")
            .notNullable()
            .references("id")
            .inTable("datasets")
            .onDelete("CASCADE");
        table.integer("row_index").notNullable();
        table.jsonb("data").notNullable().defaultTo(knex.raw("'{}'::jsonb"));
        table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());

        table.unique(["dataset_id", "row_index"]);
        table.index(["dataset_id"]);
        table.index(["row_index"]);
        table.index(["data"], "dataset_rows_data_gin_idx", "GIN");

        table.check("?? >= 0", ["row_index"]);
    });

    await knex.schema.createTable("workspaces", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.text("name").notNullable();
        table
            .uuid("dataset_id")
            .notNullable()
            .references("id")
            .inTable("datasets")
            .onDelete("CASCADE");
        table.jsonb("query_tree").notNullable();
        table.jsonb("chart_config").notNullable().defaultTo(knex.raw("'[]'::jsonb"));
        table.jsonb("table_config").notNullable().defaultTo(knex.raw("'{}'::jsonb"));
        table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());

        table.index(["dataset_id"]);
    });

    await knex.schema.createTable("ai_insights", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table
            .uuid("workspace_id")
            .references("id")
            .inTable("workspaces")
            .onDelete("SET NULL");
        table
            .uuid("dataset_id")
            .notNullable()
            .references("id")
            .inTable("datasets")
            .onDelete("CASCADE");
        table.text("prompt").notNullable();
        table.text("response").notNullable();
        table.text("provider").notNullable();
        table.text("model").notNullable();
        table.timestamp("created_at", { useTz: true }).notNullable().defaultTo(knex.fn.now());

        table.index(["workspace_id"]);
        table.index(["dataset_id"]);
        table.index(["provider"]);

        table.check("?? in (?, ?)", ["provider", "gemini", "groq"]);
    });
};

exports.down = async function down(knex) {
    await knex.schema.dropTableIfExists("ai_insights");
    await knex.schema.dropTableIfExists("workspaces");
    await knex.schema.dropTableIfExists("dataset_rows");
    await knex.schema.dropTableIfExists("dataset_columns");
    await knex.schema.dropTableIfExists("datasets");
};