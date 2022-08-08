import { NextFunction, Request, Response } from "express";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import HttpServer from "../http-server/HttpServer";
import OrderController from './controller/OrderController';
import ErrorDto from "./dto/ErrorDto";

export default class RestApi {
    private hasStarted?: boolean

    constructor(
        private httpServer: HttpServer,
        private repositoryFactory: RepositoryFactory
    ) { }

    public start(port: number, contextPath: string = '/api') {
        if (this.hasStarted) return;
        this.httpServer.withContextPath(contextPath)
        this.setupControllers()
        this.setupErrorHandlers()
        this.httpServer.start(port, () => {
            console.log(`Started application at port ${port}`);
        })
    }

    public stop(): void {
        this.httpServer.stop()
    }

    private setupControllers() {
        this.httpServer.mapRoute('/orders', OrderController.setup(this.httpServer.getRouter(), this.repositoryFactory))
    }

    private setupErrorHandlers() {
        this.httpServer.withHandler((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack)
            const status = 500
            res
                .status(status)
                .json(ErrorDto.of(err.message ?? 'Unexpected error', status))
        })

        this.httpServer.withHandler((req: Request, res: Response, next: NextFunction) => {
            const status = 404
            res
                .status(status)
                .json(ErrorDto.of(`Cannot ${req.method} ${req.path}`, status))
        })
    }
}
