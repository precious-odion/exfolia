import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),

    API_PORT: z.coerce.number().int().positive().default(4000),

    FRONTEND_URL: z.string().url().default("http://localhost:3000"),

    DATABASE_URL: z
        .string()
        .default("postgresql://exfolia:exfolia_password@localhost:5432/exfolia_dev"),

    TEST_DATABASE_URL: z
        .string()
        .default("postgresql://exfolia:exfolia_password@localhost:5432/exfolia_test"),

    AI_PROVIDER: z.enum(["gemini", "groq"]).default("gemini"),

    GEMINI_API_KEY: z.string().optional(),
    GROQ_API_KEY: z.string().optional()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
    throw new Error("Invalid environment configuration");
}

export const env = parsedEnv.data;