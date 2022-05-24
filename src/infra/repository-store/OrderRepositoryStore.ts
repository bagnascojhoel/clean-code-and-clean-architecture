import Order from "../../domain/entity/Order";
import OrderRepository from "../../domain/repository/OrderRepository";
import Store from "../store/Store";

export default class OrderRepositoryStore implements OrderRepository {
    private storeConnection: Store

    constructor(storeConnection: Store) {
        this.storeConnection = storeConnection;
    }

    async insert(order: Order): Promise<number> {
        const orderContent = await this.storeConnection.get('order') ?? [];
        const sequenceId = orderContent.length;
        const newOrder = {
            id: sequenceId,
            code: order.code,
            cpf: order.cpf.value
        }
        const newOrderContent = [...orderContent, newOrder]
        const result = await this.storeConnection.set('order', orderContent)
        return newOrder.id
    }

}

type OrderStore = {
    id: number
    code: string
    cpf: string
    createdAt: Date
    coupon: string
}

type FreightStore = {
    id: number
    orderCode: string
    price: string
    destinationAddressId: number
}

type AddressStore = {
    id: number
    location: string
}
