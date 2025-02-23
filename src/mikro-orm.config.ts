import { MariaDbDriver, type Options } from "@mikro-orm/mariadb";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { configDotenv } from "dotenv";
configDotenv();

const port = parseInt(process.env.DB_PORT || "3306");

const config: Options = {
    driver: MariaDbDriver,
    dbName: "SistemaProntuario",
    entities: ["src/domain/entities/*.entity.ts"],
    metadataProvider: TsMorphMetadataProvider,
    debug: true,

    migrations: {
        transactional: false,
        path: "./src/infrastructure/database/migrations",
    },

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: port,
    password: process.env.DB_PASSWORD,
};

export default config;
