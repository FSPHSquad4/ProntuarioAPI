import type { NextFunction, Request, Response } from "express";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import { CreatePatientService } from "@application/services/patients/create-patient.service";
import { TYPES } from "@shared/constants/constants";

export class CreatePatientController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const createPatientService =
                    container.get<CreatePatientService>(
                        TYPES.CreatePatientService,
                    );

                const {
                    fullName,
                    cpf,
                    birthDate,
                    gender,
                    maritalStatus,
                    companionName,
                    companionCpf,
                } = req.body;

                const patient = await createPatientService.execute({
                    fullName,
                    cpf,
                    birthDate,
                    gender,
                    maritalStatus,
                    companionName,
                    companionCpf,
                });

                return res.status(201).json(patient);
            } catch (error) {
                next(error);
            }
        },
    );
}
