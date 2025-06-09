import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";
import type { IGenericUserRepository } from "@domain/interfaces/repositories/generic-user.irepository";
import type { LoginUserDTO } from "@domain/dto/auth/login.dto";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Receptionist } from "@domain/entities/receptionist.entity";
import { Roles } from "@domain/entities/user.entity";

@injectable()
export class LoginService {
    constructor(
        @inject(TYPES.GenericUserRepository)
        private readonly _userRepository: IGenericUserRepository,
    ) {}

    async execute({ email, password }: LoginUserDTO): Promise<string> {
        const user = await this._userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const isPasswordValid: boolean = await bcrypt.compare(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new AppError("Invalid password", 401);
        }

        const token = this.signToken({
            email,
            role:
                user instanceof Receptionist
                    ? Roles.RECEPTIONIST
                    : Roles.PROFESSIONAL,
        });

        return token;
    }

    private signToken(payload: object): string {
        return jwt.sign(payload, `${process.env.JWT_SECRET}`, {
            expiresIn: "1h",
        });
    }
}
