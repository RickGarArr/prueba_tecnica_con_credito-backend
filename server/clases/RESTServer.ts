import Express from 'express';

export default class RESTServer {

    private static _instance: RESTServer;

    private _app: Express.Application;
    private _port: number = Number(process.env.PORT);

    private constructor() {
        this._app = Express();
    }

    // getters
    public static get instance() {
        return RESTServer._instance || (RESTServer._instance = new RESTServer());
    }

    public get app(): Express.Application {
        return this._app;
    }

    public get port(): number {
        return this._port;
    }

    // methods
    public start(callback: Function): void {
        this.app.listen(this._port, callback());
    }
}