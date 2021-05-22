import fs from 'fs';
import moment from 'moment';
import pathJS from 'path';

export function eliminarCarpeta(path: string) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                eliminarCarpeta(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

export function eliminarFile(filename: string) {
    try {
        const path = pathJS.join(__dirname, '../uploads', filename);
        fs.unlinkSync(path);
    } catch (err) {
        console.log(err);
    }
}

export function getPathFile(created_at: Date, filename: string) {
    return new Promise<string>((resolve, reject) => {
        const fecha = moment(created_at).format('YYYYMMDDHHmmss');
        const filePath = pathJS.resolve(__dirname, `../uploads/${fecha}/${filename}`);
        if (!fs.existsSync(filePath)) return reject('El archivo no existe');
        resolve(filePath);
    });
}

export function createPathFile(buffer?: Buffer, type: any = "", filename: any = "") {
    return new Promise<string>((resolve, reject) => {
        try {
            const pathToFile = pathJS.resolve(__dirname, '../uploads');
            if (!fs.existsSync(pathToFile)) fs.mkdirSync(pathToFile, { recursive: true });
            const pathFile = pathJS.resolve(pathToFile, filename);
            if (buffer) {
                fs.writeFileSync(pathFile, buffer);
                resolve(pathFile);
            }
        } catch (err) {
            reject('Error al crear el archivo');
        }
    });
}