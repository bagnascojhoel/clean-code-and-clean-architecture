import OrderCode from "../../domain/entity/order/OrderCode";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import OrderRepository from "../../domain/repository/OrderRepository";

export default class AbortOrderUseCase {
    private readonly orderRepository: OrderRepository;

    constructor(private readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrder()
    }

    public async execute({ orderCode }: AbortOrderInput, presenter: AbortOrderPresenter): Promise<void> {
        const order = await this.orderRepository.findOne(orderCode)
        if (!order) presenter.onNotFound()

    }
}

export type AbortOrderInput = {
    orderCode: OrderCode
}

export type AbortOrderPresenter = {
    onSuccess(): void;
    onNotFound(): void;
}
