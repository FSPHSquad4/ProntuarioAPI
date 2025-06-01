import type { DeletePatientService } from "@application/services/patients/delete-patient.service";
import { TYPES } from "@shared/constants/constants";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import type { NextFunction, Request, Response } from "express";

export class DeletePatientController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const deletePatientService =
                    container.get<DeletePatientService>(
                        TYPES.DeletePatientService,
                    );

                const { id } = req.params;

                const deletePatient = await deletePatientService.execute(+id);

                if (!deletePatient) {
                    throw new AppError(
                        "There was an error while removing the patient",
                        422,
                    );
                }

                return res.status(204).json();
            } catch (error) {
                next(error);
            }
        },
    );
}
