import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";
import { TYPES } from "@shared/constants/constants";
import type { CreatePatientController } from "@application/controllers/patients/create-patient.controller";
import type { ListPatientsController } from "@application/controllers/patients/list-patients.controller";
import type { UpdatePatientController } from "@application/controllers/patients/update-patient.controller";
import type { DeletePatientController } from "@application/controllers/patients/delete-patient.controller";
import { validateSchema } from "@infrastructure/middlewares/validateSchema";
import {
    createPatientSchema,
    updatePatientSchema,
} from "@domain/schemas/patient.schema";
import { resolveController } from "@shared/helpers/resolveController";
import { authorize } from "@infrastructure/middlewares/authorize";

const patientRoutes = Router();

patientRoutes.post(
    "/",
    authorize,
    validateSchema(createPatientSchema),
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<CreatePatientController>(
            TYPES.CreatePatientController,
        );

        controller.handle(req, res, next);
    },
);

patientRoutes.get(
    "/",
    authorize,
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<ListPatientsController>(
            TYPES.ListPatientsController,
        );

        controller.handle(req, res, next);
    },
);

patientRoutes.patch(
    "/:id",
    authorize,
    validateSchema(updatePatientSchema),
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<UpdatePatientController>(
            TYPES.UpdatePatientController,
        );

        controller.handle(req, res, next);
    },
);

patientRoutes.delete(
    "/:id",
    authorize,
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<DeletePatientController>(
            TYPES.DeletePatientController,
        );

        controller.handle(req, res, next);
    },
);

export default patientRoutes;
