import express from 'express';
import path from 'path';
// importaciones necesarias
import { json, urlencoded } from 'express';
import CORS from 'cors';
// server classes
import LocalServer from './clases/RESTServer';
import DBConnection from './clases/DBConnection';
// obtener instancia de la clase server
const server = LocalServer.instance;

// configurar la app de express para usar json y urlencoded
server.app.use(json());
server.app.use(urlencoded({extended: true}));
// permitir los origenes y credenciales
server.app.use(CORS({origin: true, credentials: true }));

// importar los endpoints y que app las use
import routes from './rutas/routes';
server.app.use('/concredito', routes);
// definir el directorio estatico para el frontend
server.app.use(express.static(__dirname + '/public'));
//en la ruta base se redireccionará a la pagina del frontend
server.app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});
// culquier otra ruta que no esté registrada, la va a resolver la spa frontend
server.app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});
// iniciar la conexion a la base de datos de mongo
DBConnection.dbConection();
// iniciar la escuca de peticiones
server.start(() => {
    console.log('Servidor escuchando en el puerto:', server.port);
});