import type { UpdatePatientService } from "@application/services/patients/update-patient.service";
import { TYPES } from "@shared/constants/constants";
import { container } from "@shared/injection/container";
import { asyncHandler } from "@shared/middlewares/asyncHandler";
import type { NextFunction, Request, Response } from "express";

export class UpdatePatientController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const updatePatientService =
                    container.get<UpdatePatientService>(
                        TYPES.UpdatePatientService,
                    );

                const { id } = req.params;

                const {
                    fullName,
                    cpf,
                    birthDate,
                    gender,
                    maritalStatus,
                    companionName,
                    companionCpf,
                } = req.body;

                const patient = await updatePatientService.execute({
                    id: Number(id),
                    fullName,
                    cpf,
                    birthDate,
                    gender,
                    maritalStatus,
                    companionName,
                    companionCpf,
                });

                return res.status(200).json(patient);
            } catch (error) {
                next(error);
            }
        },
    );
}
