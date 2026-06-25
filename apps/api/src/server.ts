import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = buildApp();

async function startServer() {
    try {
        await app.listen({
            port: env.API_PORT,
            host: "0.0.0.0"
        });

        app.log.info(`Exfolia API running on port ${env.API_PORT}`);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

void startServer();

async function shutdown(signal: string) {
    app.log.info(`Received ${signal}. Shutting down Exfolia API...`);

    try {
        await app.close();
        process.exit(0);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

process.on("SIGINT", () => {
    void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
});