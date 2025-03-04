import type { User } from "@domain/entities/user.entity";
import type { IBaseRepository } from "./base.repository";

export interface IUserRepository extends IBaseRepository<User> {
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByRole(role: number): Promise<User | null>;
    login(username: string, password: string): Promise<User | null>;
}
