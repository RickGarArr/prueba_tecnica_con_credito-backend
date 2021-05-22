import { Schema, model } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
import { IProspecto } from '../interfaces/prospecto';
import { IFile } from '../interfaces/prospecto';

const filesSchema = new Schema<IFile>({
    nombre: String,
    filename:  String,
    buffer: Buffer,
    type: String,
});

const prospectoSchema = new Schema<IProspecto>({
    nombre: {
        type: String,
        required: [true, "El campo es nesesario"]
    },
    apellido_pat: {
        type: String,
        required: [true, "El campo es nesesario"]
    },
    apellido_mat: {
        type: String
    },
    calle: {
        type: String,
        required: [true, "El campo es nesesario"]
    },
    numero: {
        type: String,
        required: [true, "El campo es nesesario"]
    },
    colonia: {
        type: String,
        required: [true, "El campo es nesesario"]
    },
    codigo_postal: {
        type: Number,
        required: [true, "El campo es nesesario"]
    },
    telefono: {
        type: String,
        required: [true, "El campo es nesesario"]
    },
    rfc: {
        type: String,
        required: [true, "El campo es nesesario"]
    },
    estatus: {
        type: String,
        required: [true, "El campo es nesesario"]
    },
    observaciones: {
        type: String
    },
    files: [ filesSchema ]
}, { collection: 'prospectos' });

// prospectoSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

prospectoSchema.methods.toJSON = function () {
    const { __v, _id, id, files, created_at, ...object } = this.toObject();
    object.id = _id;
    const newFiles = (files as Array<IFile>).map(file => {
        const nombre = file.nombre;
        const filename = file.filename;
        return { nombre, filename };
    });
    object.files = newFiles;
    return object;
};

export const Prospecto = model<IProspecto>('flujos', prospectoSchema);
