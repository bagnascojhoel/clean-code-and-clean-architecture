import express, { NextFunction, Request, Response } from "express";
import OrderController from './controller/OrderController';
import ErrorDto from "./dto/ErrorDto";

const app = express()

// Context-path
app.route('/api')

// Controllers
app.use('/orders', OrderController)

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    const status = 500
    res
        .status(status)
        .json(ErrorDto.of(err.message ?? 'Unexpected error', status))
})

// Not found
app.use((req: Request, res: Response, next: NextFunction) => {
    const status = 404
    res
        .status(status)
        .json(ErrorDto.of(`Cannot ${req.method} ${req.path}`, status))
})

export function start(port: number) {
    app.listen(port, () => {
        console.log(`Started application at port ${port}`);

    })
}
