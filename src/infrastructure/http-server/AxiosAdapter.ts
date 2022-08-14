
import express, { ErrorRequestHandler, RequestHandler, Router } from "express";
import http from "node:http";
import { ParsedQs } from "qs";
import HttpServer from "./HttpServer";

export default class AxiosAdapter implements HttpServer {
    private app: express.Application
    private server?: http.Server
    private contextPath: string = ''

    constructor(private readonly onStartup?: (() => void)) {
        this.app = express()
    }

    getRouter(): Router {
        return Router()
    }

    start(port: number, callback?: (() => void) | undefined): void {
        this.server = this.app.listen(port, () => {
            callback ? callback() : null;
            this.onStartup ? this.onStartup() : null;
        })
    }

    stop(): void {
        this.server?.close()
    }

    withContextPath(contextPath: string): void {
        this.contextPath = contextPath
    }

    mapRoute(route: string, router: Router): void {
        const fullRoute = this.contextPath ? this.contextPath + route : route
        this.app.use(fullRoute, router)
    }

    withHandler(handler: RequestHandler<any, any, any, ParsedQs, Record<string, any>> | ErrorRequestHandler<any, any, any, ParsedQs, Record<string, any>>): void {
        this.app.use(handler)
    }
}
