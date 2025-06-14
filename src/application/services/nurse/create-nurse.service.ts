import type { CreateNurseDTO } from "@domain/dto/nurse/create-nurse.dto";
import type { Nurse } from "@domain/entities/nurse.entity";
import type { INurseRepository } from "@domain/interfaces/repositories/nurse.irepository";
import { TYPES } from "@shared/constants/constants";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";

@injectable()
export class CreateNurseService {
    constructor(
        @inject(TYPES.NurseRepository)
        private readonly _nurseRepository: INurseRepository,
    ) {}

    async execute(data: CreateNurseDTO): Promise<Nurse> {
        const nurseAlreadyExists = await this._nurseRepository.findByRegister(
            data.nurseLicense,
        );

        if (nurseAlreadyExists) {
            throw new AppError("Nurse already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const dataToSave = { ...data, password: hashedPassword };

        const nurse = await this._nurseRepository.add(dataToSave);

        return nurse;
    }
}
