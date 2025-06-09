import { z } from "zod";
import { ConsultationStatus } from "@domain/entities/booking.entity";

export const createBookingSchema = z.object({
    patientId: z.number().positive(),
    receptionistId: z.number().positive().optional(),
    professionalId: z.number().positive(),
    consultationDate: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z?$/,
            "Data deve estar no formato ISO",
        ),
    consultationStatus: z.nativeEnum(ConsultationStatus).optional(),
    notes: z.string().max(500).optional().nullable(),
});

export const updateBookingSchema = z.object({
    patientId: z.number().positive().optional(),
    receptionistId: z.number().positive().optional().nullable(),
    professionalId: z.number().positive().optional(),
    consultationDate: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z?$/,
            "Data deve estar no formato ISO",
        )
        .optional(),
    consultationStatus: z.nativeEnum(ConsultationStatus).optional(),
    notes: z.string().max(500).optional().nullable(),
});
