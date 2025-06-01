import type { UpdatePatientDTO } from "@domain/dto/patients/update-patient.dto";
import type { Patient } from "@domain/entities/patient.entity";
import type { IPatientRepository } from "@domain/interfaces/repositories/patient.irepository";
import { TYPES } from "@shared/constants/constants";
import { parseDateFormat } from "@shared/helpers/parseDateFormat";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import { inject, injectable } from "inversify";

@injectable()
export class UpdatePatientService {
    constructor(
        @inject(TYPES.PatientRepository)
        private _patientRepository: IPatientRepository,
    ) {}

    async execute({
        id,
        fullName,
        cpf,
        birthDate,
        gender,
        maritalStatus,
        companionName,
        companionCpf,
    }: UpdatePatientDTO): Promise<Patient> {
        const patient = await this._patientRepository.findById(id);

        if (!patient) {
            throw new AppError("Patient not found", 404);
        }

        let parsedBirthDate: Date | undefined = undefined;

        if (birthDate) {
            parsedBirthDate = parseDateFormat(birthDate as unknown as string);
        }

        patient.fullName = fullName ?? patient.fullName;
        patient.cpf = cpf ?? patient.cpf;
        patient.birthDate = parsedBirthDate ?? patient.birthDate;
        patient.gender = gender ?? patient.gender;
        patient.maritalStatus = maritalStatus ?? patient.maritalStatus;
        patient.companionName = companionName ?? patient.companionName;
        patient.companionCpf = companionCpf ?? patient.companionCpf;

        await this._patientRepository.update(id, patient);

        return patient;
    }
}
