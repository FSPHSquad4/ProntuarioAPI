import { CreateUserService } from "@application/services/users/create-user.service";
import { TYPES } from "@shared/constants/constants";
import { container } from "@shared/injection/container";
import { asyncHandler } from "@shared/middlewares/asyncHandler";
import type { NextFunction, Request, Response } from "express";

export class CreateUserController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const createUserService = container.get<CreateUserService>(
                    TYPES.CreateUserService,
                );

                const { username, email, password, role } = req.body;

                await createUserService.execute({
                    username,
                    email,
                    password,
                    role,
                });

                return res
                    .status(201)
                    .json({ message: "User successfully created" });
            } catch (error) {
                next(error);
            }
        },
    );
}
