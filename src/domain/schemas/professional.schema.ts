import { z } from "zod";

export const createProfessionalSchema = z.object({
    fullName: z.string().min(3).max(255),
    register: z.string().min(3).max(50),
    specialty: z.string().min(2).max(100),
    contact: z.string().min(8).max(50),
    availability: z.string().min(3).max(255),
    birthDate: z
        .string()
        .regex(
            /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/]\d{4}$/,
            "Invalid date format",
        ),
    gender: z.string().min(1).max(1),
    maritalStatus: z.string().min(1).max(1).optional(),
});

export const updateProfessionalSchema = z.object({
    fullName: z.string().min(3).max(255).optional(),
    register: z.string().min(3).max(50).optional(),
    specialty: z.string().min(2).max(100).optional(),
    contact: z.string().min(8).max(50).optional(),
    availability: z.string().min(3).max(255).optional(),
    birthDate: z
        .string()
        .regex(
            /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/]\d{4}$/,
            "Invalid date format",
        )
        .optional(),
    gender: z.string().min(1).max(1).optional(),
    maritalStatus: z.string().min(1).max(1).optional(),
});
