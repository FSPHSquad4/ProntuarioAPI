import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";
import { Booking } from "@domain/entities/booking.entity";
import type { IBookingRepository } from "@domain/interfaces/repositories/booking.irepository";

@injectable()
export class ListBookingsService {
    constructor(
        @inject(TYPES.BookingRepository)
        private readonly _bookingRepository: IBookingRepository,
    ) {}

    async execute(): Promise<Booking[]> {
        return await this._bookingRepository.listAll();
    }

    async findByPatientId(patientId: number): Promise<Booking[]> {
        return await this._bookingRepository.findByPatientId(patientId);
    }

    async findByProfessionalId(professionalId: number): Promise<Booking[]> {
        return await this._bookingRepository.findByProfessionalId(
            professionalId,
        );
    }

    async findUpcomingBookings(limit?: number): Promise<Booking[]> {
        return await this._bookingRepository.findUpcomingBookings(limit);
    }
}
