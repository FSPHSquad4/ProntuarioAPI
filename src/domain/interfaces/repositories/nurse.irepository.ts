import type { Nurse } from "@domain/entities/nurse.entity";
import type { IBaseRepository } from "./base.irepository";

export interface INurseRepository extends IBaseRepository<Nurse> {
    findByRegister(nurseLicense: string): Promise<Nurse | null>;
}
