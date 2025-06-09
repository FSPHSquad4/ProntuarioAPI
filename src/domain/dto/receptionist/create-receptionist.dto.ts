import type { Roles } from "@domain/entities/user.entity.ts";

export interface CreateReceptionistDTO {
    name: string;
    email: string;
    password: string;
    role: Roles.RECEPTIONIST;
}
