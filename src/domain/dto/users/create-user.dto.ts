import type { Roles } from "@domain/entities/user.entity.ts";

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: Roles.PROFESSIONAL;
}
