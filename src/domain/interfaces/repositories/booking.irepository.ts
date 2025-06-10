import { Booking } from "@domain/entities/booking.entity";
import type { IBaseRepository } from "./base.irepository";

export interface IBookingRepository extends IBaseRepository<Booking> {
    findByPatientId(patientId: number): Promise<Booking[]>;
    findByProfessionalId(professionalId: number): Promise<Booking[]>;
    findByDate(date: Date): Promise<Booking[]>;
    findUpcomingBookings(limit?: number): Promise<Booking[]>;
}
