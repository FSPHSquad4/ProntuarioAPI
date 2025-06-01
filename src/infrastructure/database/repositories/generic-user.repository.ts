import { EntityManager } from "@mikro-orm/mariadb";
import { Roles, User } from "@domain/entities/user.entity";
import { injectable } from "inversify";

@injectable()
export class GenericUserRepository {
    constructor(private readonly em: EntityManager) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.em.findOne(User, { email });
    }

    async findByRole(role: Roles): Promise<User | null> {
        return this.em.findOne(User, { role });
    }
}
