import Order from "../../domain/entity/order/Order";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class ListOrdersUseCase {
    private readonly orderRepository: OrderRepository

    constructor(private repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createForOrder()
    }

    public async execute(presenter: ListOrdersPresenter) {
        const orders = await this.orderRepository.findAll()
        presenter.onSuccess(orders)
    }
}

export type ListOrdersPresenter = {
    onSuccess(orders: Order[]): void;
};
