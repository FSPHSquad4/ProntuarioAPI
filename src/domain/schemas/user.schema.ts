import { z } from "zod";

export const createUserSchema = z
    .object({
        username: z.string().min(3).max(20),
        email: z.string().regex(/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i),
        password: z.string().min(6),
        passwordConfirmation: z.string().min(6),
        role: z.number(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"],
    });

export const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});
