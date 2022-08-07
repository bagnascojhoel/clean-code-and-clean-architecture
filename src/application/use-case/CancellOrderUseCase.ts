import { DateTime } from "luxon";
import OrderCode from "../../domain/entity/order/OrderCode";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class CancelOrderUseCase {
    private readonly orderRepository: OrderRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createForOrder()
    }

    async execute({ orderCode }: CancelledOrderInput, presenter: CancelledOrderPresenter): Promise<void> {
        const order = await this.orderRepository.findOne(orderCode)
        if (!order) {
            presenter.onNotFound()
            return;
        }
        order.cancel(DateTime.now())
        await this.orderRepository.saveCancellation(order)
        presenter.onSuccess()
    }
}

export type CancelledOrderInput = {
    orderCode: OrderCode
}

export type CancelledOrderPresenter = {
    onSuccess(): void;
    onNotFound(): void;
}
