import { z } from "zod";

export const createPatientSchema = z.object({
    fullName: z.string().min(3).max(255),
    cpf: z.string().length(11, "Send a valid CPF."),
    birthDate: z
        .string()
        .regex(
            /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/]\d{4}$/,
            "Invalid date format",
        ),
    gender: z.string().min(1).max(1),
    maritalStatus: z.string().min(1).max(1),
    companionName: z.string().min(3).max(255).nullable().optional(),
    companionCpf: z.string().length(11).nullable().optional(),
});

export const updatePatientSchema = z.object({
    fullName: z.string().min(3).max(255).optional(),
    cpf: z.string().length(11).optional(),
    birthDate: z
        .string()
        .regex(
            /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/]\d{4}$/,
            "Invalid date format",
        )
        .optional(),
    gender: z.string().min(1).max(1).optional(),
    maritalStatus: z.string().min(1).max(1).optional(),
    companionName: z.string().min(3).max(255).nullable().optional(),
    companionCpf: z.string().length(11).nullable().optional(),
});
