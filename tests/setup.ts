import { Database } from "@infrastructure/database/connection";
import { afterAll, beforeAll } from "bun:test";
import config from "@mikro-test";

beforeAll(async () => {
    try {
        await Database.connect(config);
        await Database.getInstance().getMigrator().up();
    } catch (error) {
        console.error("Failed to initialize database:", error);
        throw error;
    }
});

afterAll(async () => {
    await Database.close();
});
