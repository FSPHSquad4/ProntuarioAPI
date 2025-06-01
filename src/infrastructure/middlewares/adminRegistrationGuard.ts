import type { Request, Response, NextFunction } from "express";
import { container } from "@infrastructure/injection/container";
import { TYPES } from "@shared/constants/constants";
import { Roles } from "@domain/entities/user.entity";
import type { IGenericUserRepository } from "@domain/interfaces/repositories/generic-user.irepository";

export const adminRegistrationGuard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.body.role && req.body.role === Roles.ADMIN) {
        const userRepository = container.get<IGenericUserRepository>(
            TYPES.GenericUserRepository,
        );

        const adminExists = await userRepository.findByRole(Roles.ADMIN);

        if (adminExists) {
            return res
                .status(403)
                .json({ message: "Já existe um administrador cadastrado." });
        }
    }

    next();
};
