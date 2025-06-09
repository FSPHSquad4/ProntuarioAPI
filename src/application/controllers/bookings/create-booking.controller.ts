import type { NextFunction, Request, Response } from "express";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import { CreateBookingService } from "@application/services/bookings/create-booking.service";
import { TYPES } from "@shared/constants/constants";
import { ZodError } from "zod";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import type { CreateBookingDTO } from "@domain/dto/bookings/create-booking.dto";

export class CreateBookingController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const createBookingService =
                    container.get<CreateBookingService>(
                        TYPES.CreateBookingService,
                    );

                const data = req.body as CreateBookingDTO;

                const booking = await createBookingService.execute(data);

                return res.status(201).json(booking);
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
