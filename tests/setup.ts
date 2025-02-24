/* eslint-disable no-console */
import { Database } from "@infrastructure/database/connection";
import { afterAll, beforeAll } from "bun:test";
import config from "@mikro-test";
import { retry } from "ts-retry-promise";

beforeAll(async () => {
    try {
        console.log("🔄 Conectando ao banco de testes...");

        await retry(
            async () => {
                await Database.connect(config);
                const orm = Database.getInstance();
                await orm.em.execute("SELECT 1");
            },
            {
                retries: 10,
                delay: 1000,
                timeout: 30000,
            },
        );

        const orm = Database.getInstance();
        const generator = orm.getSchemaGenerator();

        console.log("🧹 Limpando o banco...");
        await generator.dropSchema();

        console.log("🚀 Criando novo esquema...");
        await generator.createSchema();

        console.log("📦 Executando migrations...");
        await orm.getMigrator().up();
    } catch (error) {
        console.error("❌ Erro ao configurar o banco:", error);
        throw error;
    }
});

afterAll(async () => {
    await Database.close();
});
