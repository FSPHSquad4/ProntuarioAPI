import { inject, injectable } from "inversify";
import { BaseRepository } from "./base.repository";
import { Receptionist } from "@domain/entities/receptionist.entity";
import type { IReceptionistRepository } from "@domain/interfaces/repositories/receptionist.irepository";
import { TYPES } from "@shared/constants/constants";
import type { EntityManager } from "@mikro-orm/mariadb";

@injectable()
export class ReceptionistRepository
    extends BaseRepository<Receptionist>
    implements IReceptionistRepository
{
    constructor(
        @inject(TYPES.EntityManager)
        em: EntityManager,
    ) {
        super(em, Receptionist.name);
    }

    async findByEmail(email: string): Promise<Receptionist | null> {
        return this.em.findOne(Receptionist, { email });
    }
}
