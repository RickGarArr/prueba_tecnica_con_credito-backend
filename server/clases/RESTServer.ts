import Express from 'express';

export default class RESTServer {

    // definir una instancia de la clase para usar patron singleton
    private static _instance: RESTServer;

    private _app: Express.Application;
    private _port: number = Number(process.env.PORT) || 5000;

    private constructor() {
        // en el constructor se asigna a app la funcion de express
        this._app = Express();
    }

    // getters
    public static get instance() {
        return RESTServer._instance || (RESTServer._instance = new RESTServer());
    }
    // get application
    public get app(): Express.Application {
        return this._app;
    }
    // get port
    public get port(): number {
        return this._port;
    }

    // methods para iniciar, recibe callbak
    public start(callback: Function): void {
        this.app.listen(this._port, callback());
    }
}