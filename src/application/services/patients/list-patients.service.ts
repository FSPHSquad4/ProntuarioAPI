import type { Patient } from "@domain/entities/patient.entity";
import type { IPatientRepository } from "@domain/interfaces/repositories/patient.repository";
import { TYPES } from "@shared/constants/constants";
import { inject, injectable } from "inversify";

@injectable()
export class ListPatientsService {
    constructor(
        @inject(TYPES.PatientRepository)
        private _patientRepository: IPatientRepository,
    ) {}

    async execute(): Promise<Patient[]> {
        return await this._patientRepository.listAll();
    }
}
