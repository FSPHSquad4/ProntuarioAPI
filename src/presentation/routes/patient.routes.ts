import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";
import { container } from "@shared/injection/container";
import { TYPES } from "@shared/constants/constants";
import type { CreatePatientController } from "@application/controllers/patients/create-patient.controller";
import type { ListPatientsController } from "@application/controllers/patients/list-patients.controller";
import type { UpdatePatientController } from "@application/controllers/patients/update-patient.controller";
import type { DeletePatientController } from "@application/controllers/patients/delete-patient.controller";

const patientRoutes = Router();

const resolveController = <T>(identifier: symbol): T => {
    return container.get<T>(identifier);
};

patientRoutes.post("/", (req: Request, res: Response, next: NextFunction) => {
    const controller = resolveController<CreatePatientController>(
        TYPES.CreatePatientController,
    );

    controller.handle(req, res, next);
});

patientRoutes.get("/", (req: Request, res: Response, next: NextFunction) => {
    const controller = resolveController<ListPatientsController>(
        TYPES.ListPatientsController,
    );

    controller.handle(req, res, next);
});

patientRoutes.patch(
    "/:id",
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<UpdatePatientController>(
            TYPES.UpdatePatientController,
        );

        controller.handle(req, res, next);
    },
);

patientRoutes.delete(
    "/:id",
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<DeletePatientController>(
            TYPES.DeletePatientController,
        );

        controller.handle(req, res, next);
    },
);

export default patientRoutes;
