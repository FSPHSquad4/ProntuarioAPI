import { inject, injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import { Nurse } from "@domain/entities/nurse.entity";
import type { INurseRepository } from "@domain/interfaces/repositories/nurse.irepository";
import { TYPES } from "@shared/constants/constants";
import type { EntityManager } from "@mikro-orm/mariadb";

@injectable()
export class NurseRepository
    extends BaseRepository<Nurse>
    implements INurseRepository
{
    constructor(
        @inject(TYPES.EntityManager)
        em: EntityManager,
    ) {
        super(em, Nurse.name);
    }

    async findByRegister(nurseLicense: string): Promise<Nurse | null> {
        return this.em.findOne(Nurse, { nurseLicense });
    }
}
