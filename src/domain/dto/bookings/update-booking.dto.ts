import { ConsultationStatus } from "@domain/entities/booking.entity";

export interface UpdateBookingDTO {
    patientId?: number;
    receptionistId?: number;
    professionalId?: number;
    consultationDate?: string | Date;
    consultationStatus?: ConsultationStatus;
    notes?: string;
}
