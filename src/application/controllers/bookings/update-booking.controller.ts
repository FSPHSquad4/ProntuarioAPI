import type { NextFunction, Request, Response } from "express";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import { UpdateBookingService } from "@application/services/bookings/update-booking.service";
import { TYPES } from "@shared/constants/constants";
import { ZodError } from "zod";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import type { UpdateBookingDTO } from "@domain/dto/bookings/update-booking.dto";

export class UpdateBookingController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;

                const updateBookingService =
                    container.get<UpdateBookingService>(
                        TYPES.UpdateBookingService,
                    );

                const data = req.body as UpdateBookingDTO;

                const booking = await updateBookingService.execute(
                    Number(id),
                    data,
                );

                return res.status(200).json(booking);
            } catch (error) {
                if (error instanceof ZodError) {
                    next(new AppError(error.message, 400));
                    return;
                }
                next(error);
            }
        },
    );
}
