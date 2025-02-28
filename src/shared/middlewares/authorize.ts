import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }

    try {
        verifyToken(token);

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }
};

const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}
