import { Roles, User } from "@domain/entities/user.entity";

export interface IGenericUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findByRole(role: Roles): Promise<User | null>;
}
