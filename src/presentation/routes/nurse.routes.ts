import { CreateNurseController } from "@application/controllers/nurse/create-nurse.controller";
import { createNurseSchema } from "@domain/schemas/nurse.schema";
import { TYPES } from "@shared/constants/constants";
import { resolveController } from "@shared/helpers/resolveController";
import { validateSchema } from "@infrastructure/middlewares/validateSchema";
import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";
import { ListNurseController } from "@application/controllers/nurse/list-nurse.controller";

const nurseRoutes = Router();

nurseRoutes.post(
    "/",
    validateSchema(createNurseSchema),
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<CreateNurseController>(
            TYPES.CreateNurseController,
        );

        controller.handle(req, res, next);
    },
);

nurseRoutes.get("/", (req: Request, res: Response, next: NextFunction) => {
    const controller = resolveController<ListNurseController>(
        TYPES.ListNurseController,
    );

    controller.handle(req, res, next);
});

export { nurseRoutes };
