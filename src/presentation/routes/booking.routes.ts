import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";
import { TYPES } from "@shared/constants/constants";
import type { CreateBookingController } from "@application/controllers/bookings/create-booking.controller";
import type { ListBookingsController } from "@application/controllers/bookings/list-bookings.controller";
import type { UpdateBookingController } from "@application/controllers/bookings/update-booking.controller";
import type { DeleteBookingController } from "@application/controllers/bookings/delete-booking.controller";
import { validateSchema } from "@infrastructure/middlewares/validateSchema";
import {
    createBookingSchema,
    updateBookingSchema,
} from "@domain/schemas/booking.schema";
import { resolveController } from "@shared/helpers/resolveController";
import { authorize } from "@infrastructure/middlewares/authorize";

const bookingRoutes = Router();

bookingRoutes.post(
    "/",
    authorize,
    validateSchema(createBookingSchema),
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<CreateBookingController>(
            TYPES.CreateBookingController,
        );

        controller.handle(req, res, next);
    },
);

bookingRoutes.get(
    "/",
    authorize,
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<ListBookingsController>(
            TYPES.ListBookingsController,
        );

        controller.handle(req, res, next);
    },
);

bookingRoutes.patch(
    "/:id",
    authorize,
    validateSchema(updateBookingSchema),
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<UpdateBookingController>(
            TYPES.UpdateBookingController,
        );

        controller.handle(req, res, next);
    },
);

bookingRoutes.delete(
    "/:id",
    authorize,
    (req: Request, res: Response, next: NextFunction) => {
        const controller = resolveController<DeleteBookingController>(
            TYPES.DeleteBookingController,
        );

        controller.handle(req, res, next);
    },
);

export default bookingRoutes;
