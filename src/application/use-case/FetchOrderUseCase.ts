import Order from "../../domain/entity/Order";
import OrderCode from "../../domain/entity/OrderCode";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class FetchOrderUseCase {
    constructor(private orderRepository: OrderRepository) {
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
