import { CreateReceptionistController } from "@application/controllers/receptionists/create-receptionist.controller";
import { createReceptionistSchema } from "@domain/schemas/receptionist.schema";
import { TYPES } from "@shared/constants/constants";
import { resolveController } from "@shared/helpers/resolveController";
import { validateSchema } from "@infrastructure/middlewares/validateSchema";
import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";

const receptionistRoutes = Router();

receptionistRoutes.post(
    "/",
    validateSchema(createReceptionistSchema),
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<CreateReceptionistController>(
            TYPES.CreateReceptionistController,
        );

        controller.handle(req, res, next);
    },
);

export { receptionistRoutes };
