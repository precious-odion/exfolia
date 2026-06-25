require("dotenv").config({ path: "../../.env" });
require("dotenv").config({ path: "../../.env.local" });

const databaseUrl =
    process.env.NODE_ENV === "test"
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL or TEST_DATABASE_URL is required for Knex");
}

module.exports = {
    client: "pg",
    connection: databaseUrl,
    migrations: {
        directory: "../../database/migrations",
        extension: "cjs",
        tableName: "knex_migrations"
    },
    pool: {
        min: 0,
        max: 10
    }
};