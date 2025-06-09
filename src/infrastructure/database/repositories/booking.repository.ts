import { EntityManager } from "@mikro-orm/mariadb";
import { Booking, ConsultationStatus } from "@domain/entities/booking.entity";
import type { IBookingRepository } from "@domain/interfaces/repositories/booking.irepository";
import { BaseRepository } from "./base.repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";

@injectable()
export class BookingRepository
    extends BaseRepository<Booking>
    implements IBookingRepository
{
    constructor(@inject(TYPES.EntityManager) em: EntityManager) {
        super(em, Booking.name);
    }

    async findByPatientId(patientId: number): Promise<Booking[]> {
        return this.em.find(Booking, { patient: patientId });
    }

    async findByProfessionalId(professionalId: number): Promise<Booking[]> {
        return this.em.find(Booking, { professional: professionalId });
    }

    async findByDate(date: Date): Promise<Booking[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return this.em.find(Booking, {
            consultationDate: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });
    }

    async findUpcomingBookings(limit: number = 10): Promise<Booking[]> {
        const now = new Date();

        return this.em.find(
            Booking,
            {
                consultationDate: { $gte: now },
                consultationStatus: { $ne: ConsultationStatus.CANCELLED },
            },
            {
                limit,
                orderBy: { consultationDate: "ASC" },
            },
        );
    }
}
