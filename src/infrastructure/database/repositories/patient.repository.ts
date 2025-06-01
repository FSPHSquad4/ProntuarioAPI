import { Patient } from "@domain/entities/patient.entity";
import { BaseRepository } from "./base.repository";
import type { EntityManager } from "@mikro-orm/mariadb";
import type { IPatientRepository } from "@domain/interfaces/repositories/patient.irepository";
import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";

@injectable()
export class PatientRepository
    extends BaseRepository<Patient>
    implements IPatientRepository
{
    constructor(@inject(TYPES.EntityManager) em: EntityManager) {
        super(em, Patient.name);
    }

    async findByCpf(cpf: string): Promise<Patient | null> {
        return this.em.findOne(Patient, { cpf });
    }
}
