import type { NextFunction, Request, Response } from "express";
import { container } from "@shared/injection/container";
import { asyncHandler } from "@shared/middlewares/asyncHandler";
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
                    gender,
                    maritalStatus,
                    companionName,
                    companionCpf,
                } = req.body;

                const patient = await createPatientService.execute({
                    fullName,
                    cpf,
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
