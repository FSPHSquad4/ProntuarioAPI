import "reflect-metadata";
import "@shared/injection/container";
import { Server } from "@infrastructure/server/server";

async function bootstrap() {
    const server = new Server();
    await server.start();
}

bootstrap();
