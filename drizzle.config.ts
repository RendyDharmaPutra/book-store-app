// import "@/drizzle/envConfig";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
	schema: "./utils/db/schema.ts",
	out: "./utils/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
	verbose: true,
	strict: true,
});
