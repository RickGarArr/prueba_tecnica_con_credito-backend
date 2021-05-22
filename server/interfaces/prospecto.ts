import { Document } from 'mongoose';
export interface IProspecto {
    nombre?: string;
    apellido_pat?: string;
    apellido_mat?: string;
    calle?: string;
    numero?: string;
    colonia?: string;
    codigo_postal?: string;
    telefono?: string;
    rfc?: string;
    estatus?: string;
    observaciones?: string;
    // created_at?: Date;
    files?: Array<IFile>;
}

export interface IFile {
    nombre: String,
    filename: String,
    buffer: Buffer,
    type: String,
}

export interface IProspectoDB extends Document {
    nombre: string;
    apellido_pat: string;
    apellido_mat?: string;
    calle: string;
    numero: string;
    colonia: string;
    codigo_postal: string;
    telefono: string;
    rfc: string;
    estatus: "enviado" | "autorizado" | "rechazado";
    observaciones?: string;
    created_at: Date;
    files: Array<IFile>;
}