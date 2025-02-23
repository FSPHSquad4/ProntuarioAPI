import patientRoutes from "@presentation/routes/patient.routes";
import { Router, type Request, type Response } from "express";

const routes: Router = Router();

routes.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello, world!" });
});

routes.use("/api/patients", patientRoutes);

export { routes };
