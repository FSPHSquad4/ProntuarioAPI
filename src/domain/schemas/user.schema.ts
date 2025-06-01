import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "PROFESSIONAL", "NURSE", "RECEPTIONIST"]),
});
