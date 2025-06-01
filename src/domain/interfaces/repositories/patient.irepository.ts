import type { Patient } from "@domain/entities/patient.entity";
import type { IBaseRepository } from "./base.irepository";

export interface IPatientRepository extends IBaseRepository<Patient> {
    findByCpf(cpf: string): Promise<Patient | null>;
}
