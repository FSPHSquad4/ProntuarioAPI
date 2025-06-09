import { CreateReceptionistService } from "@application/services/receptionists/create-receptionist.service";
import { TYPES } from "@shared/constants/constants";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import type { NextFunction, Request, Response } from "express";
import type { CreateReceptionistDTO } from "@domain/dto/receptionist/create-receptionist.dto";

export class CreateReceptionistController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const CreateReceptionistService =
                    container.get<CreateReceptionistService>(
                        TYPES.CreateReceptionistService,
                    );

                const data = req.body as CreateReceptionistDTO;

                const receptionist =
                    await CreateReceptionistService.execute(data);

                const { password, ...receptionistWithoutPassword } =
                    receptionist;

                return res.status(201).json(receptionistWithoutPassword);
            } catch (error) {
                next(error);
            }
        },
    );
}
