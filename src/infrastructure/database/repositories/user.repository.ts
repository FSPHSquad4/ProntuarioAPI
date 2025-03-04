import type { IUserRepository } from "@domain/interfaces/repositories/user.repository";
import { BaseRepository } from "./base.repository";
import { User } from "@domain/entities/user.entity";
import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";
import type { EntityManager } from "@mikro-orm/mariadb";

@injectable()
export class UserRepository
    extends BaseRepository<User>
    implements IUserRepository
{
    constructor(@inject(TYPES.EntityManager) em: EntityManager) {
        super(em, User.name);
    }

    async findByEmail(email: string) {
        return this.findOne({ email });
    }
    async findByUsername(username: string) {
        return this.findOne({ username });
    }

    async findByRole(role: number) {
        return this.findOne({ role });
    }

    async login(username: string, password: string) {
        return this.findOne({ username, passwordHash: password });
    }
}
