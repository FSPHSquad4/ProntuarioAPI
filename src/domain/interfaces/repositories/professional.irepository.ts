import type { Professional } from "@domain/entities/professional.entity";
import type { IBaseRepository } from "./base.irepository";

export interface IProfessionalRepository extends IBaseRepository<Professional> {
    findByRegister(professionalLicense: string): Promise<Professional | null>;
}
