
import express, { ErrorRequestHandler, RequestHandler, Router } from "express";
import { ParsedQs } from "qs";
import HttpServer from "./HttpServer";

export default class AxiosAdapter implements HttpServer {
    private app: express.Application

    constructor() {
        this.app = express()
    }

    getRouter(): Router {
        return Router()
    }
    start(port: number, callback?: (() => void) | undefined): void {
        this.app.listen(port, callback)
    }
    withContextPath(contextPath: string): void {
        this.app.route(contextPath)
    }
    mapRoute(route: string, router: Router): void {
        this.app.use(route, router)
    }
    withHandler(handler: RequestHandler<any, any, any, ParsedQs, Record<string, any>> | ErrorRequestHandler<any, any, any, ParsedQs, Record<string, any>>): void {
        this.app.use(handler)
    }
}
