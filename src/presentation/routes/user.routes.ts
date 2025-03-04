import { CreateUserController } from "@application/controllers/users/create-user.controller";
import { createUserSchema } from "@domain/schemas/user.schema";
import { TYPES } from "@shared/constants/constants";
import { resolveController } from "@shared/helpers/resolveController";
import { validateSchema } from "@shared/middlewares/validateSchema";
import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";

const userRoutes = Router();

userRoutes.post(
    "/",
    validateSchema(createUserSchema),
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<CreateUserController>(
            TYPES.CreateUserController,
        );

        controller.handle(req, res, next);
    },
);

export { userRoutes };
