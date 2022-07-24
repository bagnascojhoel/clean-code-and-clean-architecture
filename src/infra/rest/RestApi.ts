import { NextFunction, Request, Response } from "express";
import OrderRepository from "../../domain/repository/OrderRepository";
import HttpServer from "../http-server/HttpServer";
import OrderController from './controller/OrderController';
import ErrorDto from "./dto/ErrorDto";

export default class RestApi {
    constructor(
        private httpServer: HttpServer,
        private repositories: Repositories
    ) { }

    public start(port: number, contextPath: string = '/api') {
        this.httpServer.withContextPath(contextPath)
        this.setupControllers()
        this.setupErrorHandlers()
        this.httpServer.start(port, () => {
            console.log(`Started application at port ${port}`);
        })
    }

    private setupControllers() {
        this.httpServer.mapRoute('/orders', OrderController.setup(this.httpServer.getRouter(), this.repositories.order))
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

export type Repositories = {
    order: OrderRepository
}
