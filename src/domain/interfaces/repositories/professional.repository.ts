import type { Professional } from "@domain/entities/professional.entity";
import type { IBaseRepository } from "./base.repository";

export interface IProfessionalRepository extends IBaseRepository<Professional> {
    findByRegister(register: string): Promise<Professional | null>;
}
