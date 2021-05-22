import { IProspecto, IProspectoDB } from "../interfaces/prospecto";
import { Prospecto } from '../models/prospecto';

export function create(prospecto: IProspecto, callback: Function) {
    Prospecto.create(prospecto, (err, prospecto) => {
        if (err) return callback(err);
        callback(null, prospecto);
    });
}

export function getAll(page: number = 1, { estatus, nombre }: { estatus?: any, nombre?: any}, callback: Function) {
    const limit = 10;
    const skip = page * limit - limit;
    let query: any = {};
    
    if (estatus?.trim() != '') query.estatus = estatus;
    if (nombre?.trim() != '') query.nombre = { $regex: '.*' + nombre + '.*' };
    Prospecto.find(query).countDocuments((err, number) => {
        Prospecto.find(query)
        // .skip(skip).limit(limit)
        .exec((err, prospectos) => {
            if (err) return callback('error');
            callback(null, {prospectos, number});
        });
    });
}

export function getOne(id: string, callback: Function) {
    Prospecto.findById(id, (err: any, prospecto: IProspectoDB) => {
        if (err) return callback(err);
        callback(null, prospecto);
    });
}

export function updateOne(id: string, prospecto: IProspecto, callback: Function) {
    Prospecto.findByIdAndUpdate(id, prospecto, { new: true }, (err, prospecto) => {
        if (err) return callback(err);
        callback(null, prospecto);
    });
}