import { IProspecto, IProspectoDB } from "../interfaces/prospecto";
import { Prospecto } from '../models/prospecto';
import { ObjectId } from 'mongoose';

export function create(prospecto: IProspecto, callback: Function) {
    Prospecto.create(prospecto).then(db => callback(null, db)).catch(error => callback(error));
}

export function getAll(page: number = 1, evaluados = false, callback: Function) {
    const limit = 10;
    const skip = page * limit;
    if (evaluados) {
        Promise.all([
            Prospecto.find({ estatus: {$in: ['autorizado', 'rechazado']} }),
            Prospecto.find({ estatus: {$in: ['autorizado', 'rechazado']} }).countDocuments()
        ]).then(([prospectos, count]) => { callback(null, {prospectos, count});
        }).catch(err => callback(err));
    } else {
        Promise.all([
            Prospecto.find(),
            Prospecto.countDocuments()
        ]).then(([prospectos, count]) => { callback(null, {prospectos, count});
        }).catch(err => callback(err));
    }
}

export function getOne(id: string, callback: Function) {
    Prospecto.findById(id).then(db => callback(null, db)).catch(error => callback(error));
}

export function updateOne(id: string, prospecto: IProspecto, callback: Function) {
    Prospecto.findByIdAndUpdate(id, {prospecto}, {new: true})
    .then(db => callback(null, db))
    .catch(err => callback(err));
}