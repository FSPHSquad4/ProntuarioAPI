import { CreateProfessionalController } from "@application/controllers/professionals/create-professional.controller";
import { createProfessionalSchema } from "@domain/schemas/professional.schema";
import { TYPES } from "@shared/constants/constants";
import { resolveController } from "@shared/helpers/resolveController";
import { validateSchema } from "@infrastructure/middlewares/validateSchema";
import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";
import { ListProfessionalsController } from "@application/controllers/professionals/list-professionals.controller";

const professionalRoutes = Router();

professionalRoutes.post(
    "/",
    validateSchema(createProfessionalSchema),
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<CreateProfessionalController>(
            TYPES.CreateProfessionalController,
        );

        controller.handle(req, res, next);
    },
);

professionalRoutes.get(
    "/",
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<ListProfessionalsController>(
            TYPES.ListProfessionalsController,
        );

        controller.handle(req, res, next);
    },
);

export { professionalRoutes };
