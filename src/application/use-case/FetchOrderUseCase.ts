
import Order from "../../domain/entity/order/Order";
import OrderCode from "../../domain/entity/order/OrderCode";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class FetchOrderUseCase {
    private readonly orderRepository: OrderRepository

    constructor(private repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrder();
    }

    public async execute(input: FetchOrderInput, presenter: FetchOrderPresenter): Promise<void> {
        const order = await this.orderRepository.findOne(OrderCode.fromValue(input.orderCode))
        if (order) presenter.onSuccess(order)
        else presenter.onNotFound()
    }
}

export type FetchOrderInput = {
    orderCode: string
}

export interface FetchOrderPresenter {
    onSuccess(order: Order): void;

    onNotFound(): void;
}
