import type { CreateUserDTO } from "@domain/dto/users/create-user.dto.ts";

export interface CreateNurseDTO extends CreateUserDTO {
    specialty: string;
    nurseLicense: string;
}
