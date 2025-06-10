import { inject, injectable } from "inversify";
import { TYPES } from "@shared/constants/constants";
import { Booking, ConsultationStatus } from "@domain/entities/booking.entity";
import type { CreateBookingDTO } from "@domain/dto/bookings/create-booking.dto";
import type { IBookingRepository } from "@domain/interfaces/repositories/booking.irepository";
import type { IProfessionalRepository } from "@domain/interfaces/repositories/professional.irepository";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import type { IPatientRepository } from "@domain/interfaces/repositories/patient.irepository";

@injectable()
export class CreateBookingService {
    constructor(
        @inject(TYPES.BookingRepository)
        private readonly _bookingRepository: IBookingRepository,

        @inject(TYPES.ProfessionalRepository)
        private readonly _professionalRepository: IProfessionalRepository,

        @inject(TYPES.PatientRepository)
        private readonly _patientRepository: IPatientRepository,
    ) {}

    async execute(data: CreateBookingDTO): Promise<Booking> {
        const professional = this._professionalRepository.findById(
            data.professionalId,
        );
        if (!professional) throw new AppError("not_found", 404);

        const patient = this._patientRepository.findById(data.patientId);
        if (!patient) throw new AppError("not_found", 404);

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
