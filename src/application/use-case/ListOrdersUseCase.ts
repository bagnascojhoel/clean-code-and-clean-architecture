import Order from "../../domain/entity/Order";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class ListOrdersUseCase {
    constructor(private orderRepository: OrderRepository) { }

    public async execute(presenter: ListOrdersPresenter) {
        const orders = await this.orderRepository.findAll()
        presenter.onSuccess(orders)
    }
}

export type ListOrdersPresenter = {
    onSuccess(orders: Order[]): void;
};
