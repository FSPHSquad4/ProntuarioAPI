import { CreateProfessionalService } from "@application/services/professionals/create-professional.service";
import type { CreateProfessionalDTO } from "@domain/dto/professionals/create-professional.dto";
import { TYPES } from "@shared/constants/constants";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import type { NextFunction, Request, Response } from "express";

export class CreateProfessionalController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const createProfessionalService =
                    container.get<CreateProfessionalService>(
                        TYPES.CreateProfessionalService,
                    );

                const data = req.body as CreateProfessionalDTO;

                const professional =
                    await createProfessionalService.execute(data);

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...professionalWithoutPassword } =
                    professional;

                return res.status(201).json(professionalWithoutPassword);
            } catch (error) {
                next(error);
            }
        },
    );
}
