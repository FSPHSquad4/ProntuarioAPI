import { LoginService } from "@application/services/auth/login.service";
import { TYPES } from "@shared/constants/constants";
import { container } from "@shared/injection/container";
import { asyncHandler } from "@shared/middlewares/asyncHandler";
import type { NextFunction, Request, Response } from "express";

export class LoginController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const loginService = container.get<LoginService>(
                    TYPES.LoginService,
                );

                const { username, password } = req.body;

                const token = await loginService.execute({
                    username,
                    password,
                });

                return res.json({ token });
            } catch (error) {
                next(error);
            }
        },
    );
}
