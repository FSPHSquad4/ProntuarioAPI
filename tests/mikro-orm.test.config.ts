import { MariaDbDriver, type Options } from "@mikro-orm/mariadb";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { configDotenv } from "dotenv";

configDotenv();

const port = parseInt(process.env.TEST_DB_PORT || "3306");

const config: Options = {
    driver: MariaDbDriver,
    dbName: process.env.TEST_DB_NAME,
    entities: ["src/domain/entities/*.entity.ts"],
    metadataProvider: TsMorphMetadataProvider,

    debug: false,
    driverOptions: {
        connection: {
            connectTimeout: 10000,
            socketTimeout: 30000,
        },
    },

    migrations: {
        transactional: false,
        path: "../src/infrastructure/database/migrations",
    },

    user: process.env.TEST_DB_USER,
    host: process.env.TEST_DB_HOST,
    port: port,
    password: process.env.TEST_DB_PASSWORD,
};

export default config;
