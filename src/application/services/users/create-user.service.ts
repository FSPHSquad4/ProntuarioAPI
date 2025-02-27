import type { CreateUserDTO } from "@domain/dto/auth/create-user.dto";
import type { IUserRepository } from "@domain/interfaces/repositories/user.repository";
import { TYPES } from "@shared/constants/constants";
import { AppError } from "@shared/middlewares/errorHandler";
import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";

@injectable()
export class CreateUserService {
    constructor(
        @inject(TYPES.UserRepository)
        private _userRepository: IUserRepository,
    ) {}

    async execute({ username, email, password, role }: CreateUserDTO) {
        const userAlreadyExists =
            await this._userRepository.findByUsername(username);

        if (userAlreadyExists) {
            throw new AppError("User already exists", 400);
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = await this._userRepository.add({
            username,
            email,
            passwordHash,
            role,
        });

        return user;
    }
}
