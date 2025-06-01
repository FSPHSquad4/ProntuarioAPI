import "reflect-metadata";
import "@infrastructure/injection/container";
import { Server } from "./server";

async function bootstrap() {
    const server = new Server();
    await server.start();
}

bootstrap();
