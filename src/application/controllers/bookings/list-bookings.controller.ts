import type { NextFunction, Request, Response } from "express";
import { container } from "@infrastructure/injection/container";
import { asyncHandler } from "@infrastructure/middlewares/handlers/asyncHandler";
import { ListBookingsService } from "@application/services/bookings/list-bookings.service";
import { TYPES } from "@shared/constants/constants";

export class ListBookingsController {
    handle = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const listBookingsService = container.get<ListBookingsService>(
                    TYPES.ListBookingsService,
                );

                const { patientId, professionalId, upcoming } = req.query;

                let bookings;

                if (patientId) {
                    bookings = await listBookingsService.findByPatientId(
                        Number(patientId),
                    );
                } else if (professionalId) {
                    bookings = await listBookingsService.findByProfessionalId(
                        Number(professionalId),
                    );
                } else if (upcoming === "true") {
                    const limit = req.query.limit
                        ? Number(req.query.limit)
                        : undefined;
                    bookings =
                        await listBookingsService.findUpcomingBookings(limit);
                } else {
                    bookings = await listBookingsService.execute();
                }

                return res.status(200).json(bookings);
            } catch (error) {
                next(error);
            }
        },
    );
}
