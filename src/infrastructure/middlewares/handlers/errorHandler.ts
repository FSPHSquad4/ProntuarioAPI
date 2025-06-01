import type {
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response,
} from "express";

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
    ) {
        super(message);
    }
}

export const errorHandler: ErrorRequestHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
        return next();
    }

    console.error(err);
    res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
};
