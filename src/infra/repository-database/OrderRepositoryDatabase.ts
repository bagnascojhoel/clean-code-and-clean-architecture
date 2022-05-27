import { v4 as generateUuidV4 } from 'uuid'
import Order from "../../domain/entity/Order";
import OrderItem from "../../domain/entity/OrderItem";
import OrderRepository from "../../domain/repository/OrderRepository";
import DatabaseConnection from "../database/DatabaseConnection";

const TABLE_ORDER = '`order`';
const TABLE_ORDER_ITEM = 'order_item';
const PENDING_CODE_PREFIX = 'pending#';

export default class OrderRepositoryDatabase implements OrderRepository {
    private connection: DatabaseConnection

    constructor(conn: DatabaseConnection) {
        this.connection = conn
    }

    async insert(order: Order): Promise<number> {
        const insertOrderStatement = `insert into ${TABLE_ORDER} (code, buyer_cpf, created_at) values (?, ?, ?)`
        const pendingCode = this.generatePendingCode()
        await this.connection.query(insertOrderStatement, [pendingCode, order.cpf.value, order.createdAt.toISO()])
        const orderId = await this.releasePendingOrder(pendingCode, order)
        await this.insertOrderItems(orderId, order.items)
        return orderId
    }

    private generatePendingCode(): string {
        return PENDING_CODE_PREFIX + generateUuidV4()
    }

    private async releasePendingOrder(pendingCode: string, order: Order): Promise<number> {
        const findIdStatement = `select order_id from ${TABLE_ORDER} where code = ?`
        const orderId = (await this.connection.query(findIdStatement, [pendingCode]))[0]['order_id']
        const setCodeStatement = `update ${TABLE_ORDER} set code = ? where code = ?`
        await this.connection.query(setCodeStatement, [order.generateCode(orderId), pendingCode])
        return orderId
    }

    private async insertOrderItems(orderId: number, items: OrderItem[]): Promise<any> {
        const statementPrefix = `insert into ${TABLE_ORDER_ITEM} (order_id, warehouse_item_id, paid_unitary_price, quantity) values `
        const statementValues: string[] = []
        const values = []
        for (let item of items) {
            statementValues.push(`(?, ?, ?, ?)`)
            values.push(orderId, item.warehouseItem.id, item.paidUnitaryPrice.toNumber(), item.quantity())
        }
        const statement = statementPrefix + statementValues.join(',')
        await this.connection.query(statement, values)
    }

}
