import e, { Request, Response } from 'express';
import moment from 'moment';
import { create, getAll, getOne, updateOne } from '../access/prospecto.access';
import { createPathFile, eliminarFile, getPathFile } from '../helpers/filesHelper';
import { sendErrors } from '../helpers/sendMesages';
import { IFile, IProspectoDB } from '../interfaces/prospecto';
import mime from 'mime';

export function getProspectos(req: Request, res: Response) {

    const estatus = req.query.estatus || '';
    const nombre = req.query.nombre || '';
    const page = Number(req.query.page) || 1;

    getAll(page, { nombre, estatus }, (err: any, { prospectos, number }: { number: Number, prospectos: IProspectoDB[] }) => {
        if (err) return console.log(err);
        res.json({
            total: number,
            prospectos
        });
    });
}

export function postProspectos(req: Request, res: Response) {
    const date = moment(req.body.fecha, 'YYYYMMDDHHmmss').toDate();
    let files: Array<IFile> = [];
    Array.from(req.files as Express.Multer.File[]).forEach(file => {
        files.push({ nombre: file.fieldname, filename: file.originalname, buffer: file.buffer, type: file.mimetype });
    });
    const { nombre, apellido_pat, apellido_mat, calle, numero, colonia, codigo_postal, telefono, rfc } = req.body;
    create({
        nombre, apellido_mat, apellido_pat, calle, numero, colonia, codigo_postal, telefono, rfc, estatus: "enviado", files
    }, (err: any, prospectoDB: IProspectoDB) => {
        if (err) return console.log(err);
        res.json({
            msg: 'Prospecto creado correctamente'
        });
    });
}

export function getProspecto(req: Request, res: Response) {
    const { id } = req.params;
    getOne(id, (err: any, prospecto: IProspectoDB) => {
        if (err) return sendErrors(res, 500, 'error al obtener el prospecto');
        if (prospecto === null) return sendErrors(res, 400, 'Lo siento, no encontré lo que buscabas')
        res.json({
            prospecto
        });
    });
}

export function evaluarProspecto(req: Request, res: Response) {
    const { id } = req.params;
    const { estatus, observaciones } = req.body;
    let update: any = {};
    if (estatus !== "rechazado") { update.estatus = estatus; } else { update.estatus = estatus; update.observaciones = observaciones; }
    updateOne(id, update, (err: any, prospecto: IProspectoDB) => {
        if (err) return sendErrors(res, 400, 'error al editar prospecto');
        res.json({
            msg: `Prospecto evaluado correctamente`
        });
    });
}

export function sendFile(req: Request, res: Response) {
    const { id, filename } = req.params;
    getOne(id, async (err: any, { files }: IProspectoDB) => {
        if (err) return sendErrors(res, 400, 'Error al encontrar el archivo');
        try {
            const fileDB = files.find(file => file.filename === filename);
            const pathFile = await createPathFile(fileDB?.buffer, fileDB?.type, fileDB?.filename);
            const ct = fileDB?.type.toString() || 'application/octet-stream';
            if (!res.getHeader('content-type')) res.setHeader('Content-Type', ct);            
            res.sendFile(pathFile);
        } catch (error) {
            console.log(error);
        } finally {
            // eliminarFile(filename);
        }
    });
}