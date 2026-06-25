import Fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./config/env.js";

export function buildApp() {
    const app = Fastify({
        logger: {
            level: env.NODE_ENV === "production" ? "info" : "debug"
        }
    });

    app.register(cors, {
        origin: env.FRONTEND_URL,
        credentials: true
    });

    app.get("/health", async () => {
        return {
            status: "ok",
            service: "exfolia-api",
            environment: env.NODE_ENV
        };
    });

    return app;
}