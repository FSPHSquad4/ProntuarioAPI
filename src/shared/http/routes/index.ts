import { authRoutes } from "@presentation/routes/auth.routes";
import patientRoutes from "@presentation/routes/patient.routes";
import { professionalRoutes } from "@presentation/routes/professional.routes";
import { userRoutes } from "@presentation/routes/user.routes";
import { Router, type Request, type Response } from "express";

const routes: Router = Router();

routes.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello, world!" });
});

routes.use("/api/patients", patientRoutes);
routes.use("/api/auth", authRoutes);
routes.use("/api/users", userRoutes);
routes.use("/api/professional", professionalRoutes);

export { routes };
