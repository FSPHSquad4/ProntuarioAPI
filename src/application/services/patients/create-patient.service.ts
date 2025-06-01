import type { CreatePatientDTO } from "@domain/dto/patients/create-patient.dto";
import type { Patient } from "@domain/entities/patient.entity";
import type { IPatientRepository } from "@domain/interfaces/repositories/patient.irepository";
import { TYPES } from "@shared/constants/constants";
import { parseDateFormat } from "@shared/helpers/parseDateFormat";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import { inject, injectable } from "inversify";

@injectable()
export class CreatePatientService {
    constructor(
        @inject(TYPES.PatientRepository)
        private _patientRepository: IPatientRepository,
    ) {}

    async execute({
        fullName,
        cpf,
        birthDate,
        gender,
        maritalStatus,
        companionName,
        companionCpf,
    }: CreatePatientDTO): Promise<Patient> {
        const patientAlreadyExists =
            await this._patientRepository.findByCpf(cpf);

        if (patientAlreadyExists) {
            throw new AppError("Patient already exists", 400);
        }

        const parsedBirthDate: Date = parseDateFormat(
            birthDate as unknown as string,
        );

        const patient = await this._patientRepository.add({
            fullName,
            cpf,
            birthDate: parsedBirthDate,
            gender,
            maritalStatus,
            companionName,
            companionCpf,
        });

        return patient;
    }
}
