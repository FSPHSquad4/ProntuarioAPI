import type { NextFunction, Request, Response } from "express";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import { DeleteBookingService } from "@application/services/bookings/delete-booking.service";
import { TYPES } from "@shared/constants/constants";

export class DeleteBookingController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;

                const deleteBookingService =
                    container.get<DeleteBookingService>(
                        TYPES.DeleteBookingService,
                    );

                await deleteBookingService.execute(Number(id));

                return res.status(204).send();
            } catch (error) {
                next(error);
            }
        },
    );
}
