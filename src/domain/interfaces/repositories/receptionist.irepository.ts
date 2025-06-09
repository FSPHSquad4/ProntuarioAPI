import type { IBaseRepository } from "./base.irepository";
import type { Receptionist } from "@domain/entities/receptionist.entity";

export interface IReceptionistRepository extends IBaseRepository<Receptionist> {
    findByEmail(email: string): Promise<Receptionist | null>;
}
