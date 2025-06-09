import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";
import { Booking, ConsultationStatus } from "@domain/entities/booking.entity";
import type { CreateBookingDTO } from "@domain/dto/bookings/create-booking.dto";
import type { IBookingRepository } from "@domain/interfaces/repositories/booking.irepository";

@injectable()
export class CreateBookingService {
    constructor(
        @inject(TYPES.BookingRepository)
        private readonly _bookingRepository: IBookingRepository,
    ) {}

    async execute(data: CreateBookingDTO): Promise<Booking> {
        const booking = await this._bookingRepository.add({
            patient: data.patientId,
            receptionist: data.receptionistId,
            professional: data.professionalId,
            consultationDate: new Date(data.consultationDate),
            consultationStatus:
                data.consultationStatus ?? ConsultationStatus.SCHEDULED,
            notes: data.notes,
        });

        return booking;
    }
}
