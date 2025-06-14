import { authRoutes } from "@presentation/routes/auth.routes";
import bookingRoutes from "@presentation/routes/booking.routes";
import patientRoutes from "@presentation/routes/patient.routes";
import { professionalRoutes } from "@presentation/routes/professional.routes";
import { receptionistRoutes } from "@presentation/routes/receptionist.routes";
import { Router, type Request, type Response } from "express";
import { nurseRoutes } from "@presentation/routes/nurse.routes.ts";

const routes: Router = Router();

routes.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello, world!" });
});

routes.use("/api/patients", patientRoutes);
routes.use("/api/auth", authRoutes);
routes.use("/api/professional", professionalRoutes);
routes.use("/api/receptionist", receptionistRoutes);
routes.use("/api/booking", bookingRoutes);
routes.use("/api/nurse", nurseRoutes);

export { routes };
