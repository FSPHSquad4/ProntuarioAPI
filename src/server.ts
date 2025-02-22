import { app } from "./index";
import "dotenv";
import "reflect-metadata";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
