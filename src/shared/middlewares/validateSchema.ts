import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

export const validateSchema =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                const messages = error.errors.map((err) => {
                    return {
                        field: err.path[0],
                        message: err.message,
                    };
                });
                res.status(400).json({ errors: messages });
            }

            next(error);
        }
    };
