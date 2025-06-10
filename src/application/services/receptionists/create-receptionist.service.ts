import type { Receptionist } from "@domain/entities/receptionist.entity";
import type { IReceptionistRepository } from "@domain/interfaces/repositories/receptionist.irepository";
import { TYPES } from "@shared/constants/constants";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import type { CreateReceptionistDTO } from "@domain/dto/receptionist/create-receptionist.dto";

@injectable()
export class CreateReceptionistService {
    constructor(
        @inject(TYPES.ReceptionistRepository)
        private readonly _receptionistRepository: IReceptionistRepository,
    ) {}

    async execute(data: CreateReceptionistDTO): Promise<Receptionist> {
        const receptionistAlreadyExists =
            await this._receptionistRepository.findByEmail(data.email);

        if (receptionistAlreadyExists) {
            throw new AppError("Receptionist already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const dataToSave = { ...data, password: hashedPassword };

        const receptionist = await this._receptionistRepository.add(dataToSave);

        return receptionist;
    }
}
