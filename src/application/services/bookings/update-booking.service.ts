import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";
import { Booking } from "@domain/entities/booking.entity";
import type { UpdateBookingDTO } from "@domain/dto/bookings/update-booking.dto";
import type { IBookingRepository } from "@domain/interfaces/repositories/booking.irepository";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";

@injectable()
export class UpdateBookingService {
    constructor(
        @inject(TYPES.BookingRepository)
        private readonly _bookingRepository: IBookingRepository,
    ) {}

    async execute(id: number, data: UpdateBookingDTO): Promise<Booking> {
        const booking = await this._bookingRepository.findById(id);

        if (!booking) {
            throw new AppError("Booking not found", 404);
        }

        if (data.patientId) {
            booking.patient = data.patientId as any;
        }

        if (data?.receptionistId !== undefined) {
            booking.receptionist = data.receptionistId as any;
        }

        if (data.professionalId) {
            booking.professional = data.professionalId as any;
        }

        if (data.consultationDate) {
            booking.consultationDate = new Date(data.consultationDate);
        }

        if (data.consultationStatus) {
            booking.consultationStatus = data.consultationStatus;
        }

        if ("notes" in data) {
            booking.notes = data.notes;
        }

        await this._bookingRepository.update(id, booking);

        return booking;
    }
}
