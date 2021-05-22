import { NextFunction, Request, Response } from "express";
import _path from 'path';
import _fs from 'fs';
import _moment from 'moment';
import moment from "moment";
import { sendErrors } from "../helpers/sendMesages";
import { eliminarCarpeta } from "../helpers/filesHelper";

export function FileHandler(req: Request, res: Response, next: NextFunction) {
    const extValidas = ['pdf', 'jpg', 'jpeg'];
    const errors: string[] = [];
    Array.from(req.files as Express.Multer.File[]).forEach(file => {
        const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
        if (!extValidas.includes(ext)) errors.push(`${file.originalname} no es un archivo valido`);
        if (file.size > 2 * 1000 * 1000) errors.push(`${file.originalname} es muy grande, limite 2MB`);
    });
    if (errors.length > 0) {
        sendErrors(res, 400, ...errors);
    } else {
        next();
    }
}