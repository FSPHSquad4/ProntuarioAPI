import { EntityManager } from "@mikro-orm/mariadb";
import { Roles } from "@domain/entities/user.entity";
import { Receptionist } from "@domain/entities/receptionist.entity";
import { Professional } from "@domain/entities/professional.entity";
import { injectable } from "inversify";

@injectable()
export class GenericUserRepository {
    constructor(private readonly em: EntityManager) {}

    async findByEmail(
        email: string,
    ): Promise<Receptionist | Professional | null> {
        const receptionist = await this.em.findOne(Receptionist, { email });
        if (receptionist) return receptionist;

        const professional = await this.em.findOne(Professional, { email });
        if (professional) return professional;

        return null;
    }

    async findByRole(role: Roles): Promise<Receptionist | Professional | null> {
        if (role === Roles.RECEPTIONIST) {
            return this.em.findOne(Receptionist, {});
        }

        if (role === Roles.PROFESSIONAL) {
            return this.em.findOne(Professional, {});
        }

        return null;
    }
}
