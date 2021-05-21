import { NextFunction, Request, Response } from "express";
import { sendErrors } from "../helpers/sendMesages";

export function validarParametros(req: Request, res: Response, next: NextFunction) {
    const { nombre, apellido_pat, apellido_mat, calle, numero, colonia, codigo_postal, telefono, rfc } = req.body;
    const parametrosValidos = { nombre, apellido_pat, calle, numero, colonia, codigo_postal, telefono, rfc }
    const errors: string[] = [];
    Object.entries(parametrosValidos).forEach(([key, value]) => {
        if (!value || value.trim() == '') errors.push(`El parametro ${key} es obligatorio`);
        if (value?.length > 64) errors.push(`El parametro ${key} es muy largo`);
    });
    if (errors.length > 0) return sendErrors(res, 400, ...errors);
    next();
}

export function validarMongoID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id || id.trim() == '') return sendErrors(res, 400, 'El parametro id es necesario');
    var checkObjectID = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkObjectID.test(id)) return sendErrors(res, 400, 'El parametro id no es valido');
    next();
}

export function validarObservaciones(req: Request, res: Response, next: NextFunction) {
    const { estatus, observaciones } = req.body;
    const parametrosValidos = { estatus, observaciones };
    const errors: string[] = [];
    Object.entries(parametrosValidos).forEach(([key, value]) => {
        if (!value || value.trim() == '') errors.push(`El parametro ${key} es obligatorio`);
        if (value?.length > 64) errors.push(`El parametro ${key} es muy largo`);
    });
    if (errors.length > 0) return sendErrors(res, 400, ...errors);
    next();
}