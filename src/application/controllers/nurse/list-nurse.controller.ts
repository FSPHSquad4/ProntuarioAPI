import { ListNurseService } from "application/services/nurse/list-nurse.service.ts";
import { TYPES } from "@shared/constants/constants";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import type { NextFunction, Request, Response } from "express";

export class ListNurseController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const listNurseService = container.get<ListNurseService>(
                    TYPES.ListNurseService,
                );

                 const nurses = await listNurseService.execute();

                return res.json(nurses);
            } catch (error) {
                next(error);
            }
        },
    );
}
