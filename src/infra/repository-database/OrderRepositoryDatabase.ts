import Decimal from "decimal.js";
import Order from "../../domain/entity/Order";
import OrderRepository from "../../domain/repository/OrderRepository";
import DatabaseConnection from "../database/DatabaseConnection";

const TABLE_ORDER = 'order';

export default class OrderRepositoryDatabase implements OrderRepository {
    private connection: DatabaseConnection

    constructor(conn: DatabaseConnection) {
        this.connection = conn
    }

    async insert(order: Order): Promise<number> {
        const statement = `insert into ${TABLE_ORDER} ()`
        return Promise.resolve(0);
    }

}

type OrderTable = {
    id: number
    code: string
    buyerCpf: string
    createdAt: Date
    couponId: number
    freightId: number
}

type OrderItemTable = {
    id: number
    orderId: number
    warehouseItemId: number
    paidUnitaryPrice: Decimal
    quantity: number
}
