import type { IPatientRepository } from "@domain/interfaces/repositories/patient.repository";
import { TYPES } from "@shared/constants/constants";
import { AppError } from "@shared/middlewares/errorHandler";
import { inject, injectable } from "inversify";

@injectable()
export class DeletePatientService {
    constructor(
        @inject(TYPES.PatientRepository)
        private _patientRepository: IPatientRepository,
    ) {}

    async execute(id: number): Promise<boolean> {
        const patient = await this._patientRepository.findById(id);

        if (!patient) {
            throw new AppError("Patient not found", 404);
        }

        return await this._patientRepository.delete(patient.id);
    }
}
