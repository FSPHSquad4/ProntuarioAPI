import type { Patient } from "@domain/entities/patient.entity";
import { asyncHandler } from "@shared/middlewares/asyncHandler";
import type { NextFunction, Request, Response } from "express";
import { container } from "@shared/injection/container";
import { TYPES } from "@shared/constants/constants";
import { ListPatientsService } from "@application/services/patients/list-patients.service";

export class ListPatientsController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const listPatientsService = container.get<ListPatientsService>(
                    TYPES.ListPatientsService,
                );

                const patients: Patient[] = await listPatientsService.execute();

                return res.json(patients);
            } catch (error) {
                next(error);
            }
        },
    );
}
