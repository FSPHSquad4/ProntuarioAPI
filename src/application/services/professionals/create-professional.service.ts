import type { CreateProfessionalDTO } from "@domain/dto/professionals/create-professional.dto";
import type { Professional } from "@domain/entities/professional.entity";
import type { IProfessionalRepository } from "@domain/interfaces/repositories/professional.irepository";
import { TYPES } from "@shared/constants/constants";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";

@injectable()
export class CreateProfessionalService {
    constructor(
        @inject(TYPES.ProfessionalRepository)
        private readonly _professionalRepository: IProfessionalRepository,
    ) {}

    async execute(data: CreateProfessionalDTO): Promise<Professional> {
        const professionalAlreadyExists =
            await this._professionalRepository.findByRegister(
                data.professionalLicense,
            );

        if (professionalAlreadyExists) {
            throw new AppError("Professional already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const dataToSave = { ...data, password: hashedPassword };

        const professional = await this._professionalRepository.add(dataToSave);

        return professional;
    }
}
