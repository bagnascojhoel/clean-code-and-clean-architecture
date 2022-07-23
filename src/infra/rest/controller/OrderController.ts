
import { Router } from "express";
import ListOrdersUseCase, { ListOrdersPresenter } from "../../../application/use-case/ListOrdersUseCase";
import DatabaseConnectionKnexAdapter from "../../database/DatabaseConnectionKnexAdapter";
import OrderRepositoryDatabase from "../../repository-database/OrderRepositoryDatabase";

const router = Router()
const connection = new DatabaseConnectionKnexAdapter()
const orderRepository = new OrderRepositoryDatabase(connection)

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

export default router
