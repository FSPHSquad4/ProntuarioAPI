import type { CreateUserDTO } from "@domain/dto/users/create-user.dto.ts";

export interface CreateProfessionalDTO extends CreateUserDTO {
    specialty: string;
    professionalLicense: string;
}
