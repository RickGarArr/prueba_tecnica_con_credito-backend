import fs from 'fs';
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
        const path = pathJS.join(__dirname, '../', filename);
        fs.unlinkSync(path);
    } catch (err) {
        console.log(err);
    }
}