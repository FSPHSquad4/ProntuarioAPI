import { createUserSchema } from "@domain/schemas/user.schema";
import { z } from "zod";

export const createReceptionistSchema = createUserSchema.extend({
    role: z.literal("RECEPTIONIST"),
});
