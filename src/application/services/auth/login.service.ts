import jwt from "jsonwebtoken";
import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";
import type { IUserRepository } from "@domain/interfaces/repositories/user.repository";
import type { LoginUserDTO } from "@domain/dto/auth/login.dto";
import { AppError } from "@shared/middlewares/errorHandler";
import bcrypt from "bcrypt";

@injectable()
export class LoginService {
    constructor(
        @inject(TYPES.UserRepository)
        private _userRepository: IUserRepository,
    ) {}

    async execute({ username, password }: LoginUserDTO): Promise<string> {
        const user = await this._userRepository.findByUsername(username);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const isPasswordValid: boolean = await bcrypt.compare(
            password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new AppError("Invalid password", 401);
        }

        const token = this.signToken({ username, role: user.role });

        return token;
    }

    private signToken(payload: object): string {
        console.log(process.env.JWT_SECRET);
        return jwt.sign(payload, `${process.env.JWT_SECRET}`, {
            expiresIn: "1h",
        });
    }
}
