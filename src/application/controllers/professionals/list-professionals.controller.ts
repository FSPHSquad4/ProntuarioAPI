import { ListProfessionalsService } from "@application/services/professionals/list-professionals.service";
import { TYPES } from "@shared/constants/constants";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import type { NextFunction, Request, Response } from "express";

export class ListProfessionalsController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const listProfessionalService =
                    container.get<ListProfessionalsService>(
                        TYPES.ListProfessionalsService,
                    );

                const professionals = await listProfessionalService.execute();

                return res.json(professionals);
            } catch (error) {
                next(error);
            }
        },
    );
}
