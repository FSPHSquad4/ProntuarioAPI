import type { CreateProfessionalDTO } from "@domain/dto/professionals/create-professional.dto";
import type { Professional } from "@domain/entities/professional.entity";
import type { IProfessionalRepository } from "@domain/interfaces/repositories/professional.repository";
import { TYPES } from "@shared/constants/constants";
import { parseDateFormat } from "@shared/helpers/parseDateFormat";
import { AppError } from "@shared/middlewares/errorHandler";
import { inject, injectable } from "inversify";

@injectable()
export class CreateProfessionalService {
    constructor(
        @inject(TYPES.ProfessionalRepository)
        private _professionalRepository: IProfessionalRepository,
    ) {}

    async execute(data: CreateProfessionalDTO): Promise<Professional> {
        const professionalAlreadyExists =
            await this._professionalRepository.findByRegister(data.register);

        if (professionalAlreadyExists) {
            throw new AppError("Professional already exists", 400);
        }

        const parsedBirthDate: Date = parseDateFormat(
            data.birthDate as unknown as string,
        );

        const professional = await this._professionalRepository.add({
            ...data,
            birthDate: parsedBirthDate,
        });

        return professional;
    }
}
