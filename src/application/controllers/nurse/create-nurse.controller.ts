import type { CreateNurseDTO } from "@domain/dto/nurse/create-nurse.dto";
import { TYPES } from "@shared/constants/constants.ts";
import { container } from "@injection/container.ts";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler.ts";
import type { NextFunction, Request, Response } from "express";
import type { CreateNurseService } from "@application/services/nurse/create-nurse.service.ts";

export class CreateNurseController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const createNurseService = container.get<CreateNurseService>(
                    TYPES.CreateNurseService,
                );

                const data = req.body as CreateNurseDTO;

                const nurse = await createNurseService.execute(data);

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...nurseWithoutPassword } = nurse;

                return res.status(201).json(nurseWithoutPassword);
            } catch (error) {
                next(error);
            }
        },
    );
}
