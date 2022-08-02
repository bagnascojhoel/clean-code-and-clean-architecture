import { ErrorRequestHandler, RequestHandler, Router } from "express";

export default interface HttpServer {
    getRouter(): Router
    start(port: number, callback?: (() => void) | undefined): void
    withContextPath(contextPath: string): void
    mapRoute(route: string, router: Router): void
    withHandler(handler: RequestHandler<any>): void
    withHandler(handler: ErrorRequestHandler<any>): void
}
