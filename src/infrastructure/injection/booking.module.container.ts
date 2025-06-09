import { ContainerModule } from "inversify";
import { TYPES } from "@shared/constants/constants";
import { EntityManager } from "@mikro-orm/mariadb";
import type { IBookingRepository } from "@domain/interfaces/repositories/booking.irepository";
import { BookingRepository } from "@repositories/booking.repository";
import { CreateBookingService } from "@application/services/bookings/create-booking.service";
import { ListBookingsService } from "@application/services/bookings/list-bookings.service";
import { UpdateBookingService } from "@application/services/bookings/update-booking.service";
import { DeleteBookingService } from "@application/services/bookings/delete-booking.service";
import { CreateBookingController } from "@application/controllers/bookings/create-booking.controller";
import { ListBookingsController } from "@application/controllers/bookings/list-bookings.controller";
import { UpdateBookingController } from "@application/controllers/bookings/update-booking.controller";
import { DeleteBookingController } from "@application/controllers/bookings/delete-booking.controller";

export const bookingsModule = new ContainerModule((bind) => {
    bind<IBookingRepository>(TYPES.BookingRepository)
        .toDynamicValue((context) => {
            const em = context.container.get<EntityManager>(
                TYPES.EntityManager,
            );
            return new BookingRepository(em);
        })
        .inRequestScope();

    // Services
    bind<CreateBookingService>(TYPES.CreateBookingService)
        .to(CreateBookingService)
        .inSingletonScope();

    bind<ListBookingsService>(TYPES.ListBookingsService)
        .to(ListBookingsService)
        .inSingletonScope();

    bind<UpdateBookingService>(TYPES.UpdateBookingService)
        .to(UpdateBookingService)
        .inSingletonScope();

    bind<DeleteBookingService>(TYPES.DeleteBookingService)
        .to(DeleteBookingService)
        .inSingletonScope();

    // Controllers
    bind<CreateBookingController>(TYPES.CreateBookingController)
        .to(CreateBookingController)
        .inTransientScope();

    bind<ListBookingsController>(TYPES.ListBookingsController)
        .to(ListBookingsController)
        .inTransientScope();

    bind<UpdateBookingController>(TYPES.UpdateBookingController)
        .to(UpdateBookingController)
        .inTransientScope();

    bind<DeleteBookingController>(TYPES.DeleteBookingController)
        .to(DeleteBookingController)
        .inTransientScope();
});
