import { inject, injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import { Professional } from "@domain/entities/professional.entity";
import type { IProfessionalRepository } from "@domain/interfaces/repositories/professional.repository";
import { TYPES } from "@shared/constants/constants";
import type { EntityManager } from "@mikro-orm/mariadb";

@injectable()
export class ProfessionalRepository
    extends BaseRepository<Professional>
    implements IProfessionalRepository {
    constructor(
        @inject(TYPES.EntityManager)
        em: EntityManager
    ) {
        super(em, Professional.name)
    }

    async findByRegister(register: string): Promise<Professional | null> {
        return this.em.findOne(Professional, { register });
    }
}
