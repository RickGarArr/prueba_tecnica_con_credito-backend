import { Response } from "express";

export function sendErrors(res: Response, status: number, ...errors: string[]) {
    res.status(status).json({
        errors
    });
}