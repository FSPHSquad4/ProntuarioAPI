import { MikroORM } from "@mikro-orm/mariadb";
import express, { type Express, type Request, type Response } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv();

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

await MikroORM.init();
console.log("Connected to database");

export { app };
