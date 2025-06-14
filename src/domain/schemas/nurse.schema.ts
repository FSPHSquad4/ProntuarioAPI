import { createUserSchema } from "./user.schema.ts";
import { z } from "zod";

export const createNurseSchema = createUserSchema.extend({
    specialty: z.string().min(2).max(100),
    professionalLicense: z.string().min(3).max(50),
    role: z.literal("NURSE"),
});
