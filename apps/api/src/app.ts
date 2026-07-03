import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { env } from "./config/env.js";
import { registerDatasetRoutes } from "./modules/datasets/datasets.routes.js";

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

    app.register(multipart, {
        limits: {
            fileSize: 100 * 1024 * 1024,
            files: 1
        }
    });

    app.get("/health", async () => {
        return {
            status: "ok",
            service: "exfolia-api",
            environment: env.NODE_ENV
        };
    });

    app.register(registerDatasetRoutes, {
        prefix: "/api/datasets"
    });

    return app;
}