import { NextFunction, Request, Response } from "express";
import _path from 'path';
import _fs from 'fs';
import _moment from 'moment';
import moment from "moment";
import { sendErrors } from "../helpers/sendMesages";
import { eliminarCarpeta } from "../helpers/deleteFiles";

export function FileHandler(req: Request, res: Response, next: NextFunction) {
    req.body.fecha = moment().format('YYYYMMDDHHmmss');
    const pathToSave = _path.join(__dirname, '../uploads/', req.body.fecha);
    if (!_fs.existsSync(pathToSave)) _fs.mkdirSync(pathToSave, { recursive: true });
    try {
        const extValidas = ['pdf', 'jpg', 'jpeg'];
        const errors: string[] = [];
        Array.from(req.files as Express.Multer.File[]).forEach(file => {
            const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
            if (!extValidas.includes(ext)) {
                errors.push(`${file.originalname} no es un archivo valido`);
            } else {
                const pathFile = _path.resolve(pathToSave, file.originalname);
                _fs.writeFileSync(pathFile, file.buffer);
                file.destination = `uploads/${req.body.fecha}/`;
                file.path = `${file.destination}/${file.originalname}`;
            }
        });
        if(errors.length > 0) {
            eliminarCarpeta(pathToSave);
            sendErrors(res, 400, ...errors);
        } else {
            next();
        }
    } catch (err) {
        eliminarCarpeta(pathToSave);
        sendErrors(res, 500, 'Error al subir el archivo');
    }
}