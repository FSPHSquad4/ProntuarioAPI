import { ConsultationStatus } from "@domain/entities/booking.entity";

export interface CreateBookingDTO {
    patientId: number;
    receptionistId?: number;
    professionalId: number;
    consultationDate: string | Date;
    consultationStatus?: ConsultationStatus;
    notes?: string;
}
