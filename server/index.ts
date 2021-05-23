import express from 'express';
import path from 'path';
// importaciones necesarias
import { json, urlencoded } from 'express';
import CORS from 'cors';
// server classes
import LocalServer from './clases/RESTServer';
import DBConnection from './clases/DBConnection';

const server = LocalServer.instance;

server.app.use(json());
server.app.use(urlencoded({extended: true}));
server.app.use(CORS({origin: true, credentials: true }));

import routes from './rutas/routes';
server.app.use('/concredito', routes);

server.app.use(express.static(__dirname + '/public'));

server.app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

server.app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

DBConnection.dbConection();

server.start(() => {
    console.log('Servidor escuchando en el puerto:', server.port);
});