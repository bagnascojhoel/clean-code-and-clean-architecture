
import { Router } from "express";
import ListOrdersUseCase, { ListOrdersPresenter } from "../../../application/use-case/ListOrdersUseCase";
import OrderRepository from "../../../domain/repository/OrderRepository";

// TODO Test this
export default class OrderController {
    constructor(private router: Router, private orderRepository: OrderRepository) {
        router.get('/', async (req, res) => {
            const useCase = new ListOrdersUseCase(orderRepository)
            let result;
            const presenter: ListOrdersPresenter = {
                onSuccess(orders) {
                    result = orders
                },
            }
            await useCase.execute(presenter)
            res.json(result)
        })
    }

    public static setup(router: Router, orderRepository: OrderRepository): Router {
        new OrderController(router, orderRepository)
        return router
    }
}
