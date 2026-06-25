import knex, { type Knex } from "knex";
import { env } from "../config/env.js";

let dbInstance: Knex | null = null;

function getConnectionString() {
    if (env.NODE_ENV === "test") {
        return env.TEST_DATABASE_URL;
    }

    return env.DATABASE_URL;
}

export function createDbConnection() {
    return knex({
        client: "pg",
        connection: getConnectionString(),
        pool: {
            min: 0,
            max: 10
        }
    });
}

export function getDb() {
    if (!dbInstance) {
        dbInstance = createDbConnection();
    }

    return dbInstance;
}

export async function closeDbConnection() {
    if (dbInstance) {
        await dbInstance.destroy();
        dbInstance = null;
    }
}