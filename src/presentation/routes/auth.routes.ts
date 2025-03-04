import { LoginController } from "@application/controllers/auth/login.controller";
import { loginSchema } from "@domain/schemas/user.schema";
import { TYPES } from "@shared/constants/constants";
import { resolveController } from "@shared/helpers/resolveController";
import { validateSchema } from "@shared/middlewares/validateSchema";
import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

const authRoutes = Router();

authRoutes.post(
    "/login",
    validateSchema(loginSchema),
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<LoginController>(
            TYPES.LoginController,
        );

        controller.handle(req, res, next);
    },
);

export { authRoutes };
