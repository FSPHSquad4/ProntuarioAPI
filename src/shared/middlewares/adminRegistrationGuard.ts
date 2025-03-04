import type { Request, Response, NextFunction } from "express";
import { container } from "@shared/injection/container";
import { TYPES } from "@shared/constants/constants";
import { UserRole } from "@domain/entities/user.entity";
import type { IUserRepository } from "@domain/interfaces/repositories/user.repository";

export const adminRegistrationGuard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.body.role && Number(req.body.role) === UserRole.ADMIN) {
        const userRepository = container.get<IUserRepository>(
            TYPES.UserRepository,
        );

        const adminExists = await userRepository.findByRole(UserRole.ADMIN);

        if (adminExists) {
            return res
                .status(403)
                .json({ message: "Já existe um administrador cadastrado." });
        }
    }

    next();
};
