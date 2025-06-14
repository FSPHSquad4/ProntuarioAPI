import express from "express";
import { Database } from "@infrastructure/database/connection";
import config from "../mikro-orm.config";
import { errorHandler } from "@infrastructure/middlewares/handlers/errorHandler";
import { routes } from "@shared/http/routes";
import cors from "cors";

export class Server {
    private app: express.Application;
    private port: number;

    constructor(port: number = parseInt(process.env.PORT || "3000")) {
        this.app = express();
        this.port = port;
        this.setupCors();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    private setupMiddlewares() {
        this.app.use(express.json());
    }

    private setupRoutes() {
        this.app.use(routes);
    }

    private setupErrorHandling() {
        this.app.use(errorHandler);
    }

    private setupCors() {
        this.app.use(
            cors({
                origin: ["http://localhost:5173", "http://localhost:3000"],
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
                credentials: true,
            }),
        );
    }

    async start() {
        try {
            await Database.connect(config);
            console.log("📦 Connected to database");

            this.app.listen(this.port, () => {
                console.log(`🚀 Server running on port ${this.port}`);
            });
        } catch (error) {
            console.error("Failed to start server:", error);
            process.exit(1);
        }
    }
}
