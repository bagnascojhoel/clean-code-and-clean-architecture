
import { Router } from "express";
import ListOrdersUseCase, { ListOrdersPresenter } from "../../../application/use-case/ListOrdersUseCase";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";

// TODO Add more behaviors and test it
export default class OrderController {
    constructor(private router: Router, private repositoryFactory: RepositoryFactory) {
        router.get('', async (req, res) => {
            const useCase = new ListOrdersUseCase(repositoryFactory)
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

    public static setup(router: Router, repository: RepositoryFactory): Router {
        new OrderController(router, repository)
        return router
    }
}
