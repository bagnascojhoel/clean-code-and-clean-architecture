import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Order from "../../domain/entity/Order";
import OrderCode from '../../domain/entity/OrderCode';
import OrderItem from "../../domain/entity/OrderItem";
import OrderRepository from "../../domain/repository/OrderRepository";
import DatabaseConnection from "../database/DatabaseConnection";

const TABLE_ORDER = '`order`'
const TABLE_ORDER_ITEM = 'order_item'

const TABLE_ORDER_COLUMNS = `
    o.code,
    o.buyer_cpf as buyerCpf,
    o.created_at as createdAt
`
const TABLE_ORDER_ITEM_VALUES = `
    oi.paid_unitary_price as paidUnitaryPrice,
    oi.quantity as orderItemQuantity,
    oi.warehouse_item_id as warehouseItemId
`

type OrderRow = {
    code: string
    buyerCpf: string
    createdAt: string
}

type OrderItemRow = {
    paidUnitaryPrice: number
    orderItemQuantity: number
    warehouseItemId: number
}

type OrderAggregateRow = {
    code: string
    buyerCpf: string
    createdAt: string
    paidUnitaryPrice: number
    orderItemQuantity: number
    warehouseItemId: number
}

export default class OrderRepositoryDatabase implements OrderRepository {
    private connection: DatabaseConnection

    constructor(conn: DatabaseConnection) {
        this.connection = conn
    }

    public async save(order: Order): Promise<OrderCode> {
        const insertOrderStatement = `
        INSERT INTO ${TABLE_ORDER}
            (code, buyer_cpf, created_at)
        VALUES
            (?, ?, ?)
        `
        await this.connection.query(
            insertOrderStatement,
            [
                order.code.value,
                order.cpf.value,
                order.createdAt.toUTC().toISO()
            ]
        )
        await this.insertOrderItems(order.code, order.items)
        return order.code
    }

    public async count(): Promise<number> {
        const statement = `SELECT count(1) as total FROM ${TABLE_ORDER}`
        const [{ total }] = await this.connection.query(statement)
        return total
    }

    public async findOne(anOrderCode: OrderCode): Promise<Order | null> {
        const statementOrder = `
        SELECT ${TABLE_ORDER_COLUMNS}
        FROM ${TABLE_ORDER} as o
        WHERE o.code = ?
        `
        const [orderRow]: OrderRow[] = await this.connection.query(statementOrder, anOrderCode.value)
        if (!orderRow) return null
        const orderItems: OrderItem[] = await this.findOrderItems(anOrderCode)
        return new Order(
            anOrderCode,
            DateTime.fromISO(orderRow.createdAt),
            orderRow.buyerCpf,
            orderItems
        )
    }

    public async findAll(): Promise<Order[]> {
        const statement = `
            SELECT
                ${TABLE_ORDER_ITEM_VALUES},
                ${TABLE_ORDER_COLUMNS}
            FROM ${TABLE_ORDER} as o
            JOIN ${TABLE_ORDER_ITEM} as oi
            ON o.code = oi.order_code
        `
        const rows: OrderAggregateRow[] = await this.connection.query(statement)
        return this.createOrderAggregates(rows)
    }

    private async findOrderItems(anOrderCode: OrderCode): Promise<OrderItem[]> {
        const statement = `
        SELECT
            ${TABLE_ORDER_ITEM_VALUES}
        FROM ${TABLE_ORDER_ITEM} oi
        WHERE oi.order_code = ?
        `
        const queryResult: OrderItemRow[] = await this.connection.query(statement, anOrderCode.value)
        return queryResult.map(this.createOrderItem)
    }

    private async insertOrderItems(orderCode: OrderCode, items: OrderItem[]): Promise<any> {
        const statementPrefix = `
        INSERT INTO ${TABLE_ORDER_ITEM}
            (order_code, warehouse_item_id, paid_unitary_price, quantity)
        VALUES
        `
        const statementValues: string[] = []
        const values = []
        for (let item of items) {
            statementValues.push(`(?, ?, ?, ?)`)
            values.push(orderCode.value, item.warehouseItemId, item.paidUnitaryPrice.toNumber(), item.quantity)
        }
        const statement = statementPrefix + statementValues.join(',')
        await this.connection.query(statement, values)
    }

    private createOrderAggregates(ungroupedRows: OrderAggregateRow[]): Order[] {
        const groupedRows: Map<string, OrderAggregateRow[]> = ungroupedRows.reduce((acc, cur) => {
            const curGroup = acc.get(cur.code)
            acc.set(cur.code, !curGroup ? [cur] : [...curGroup, cur])
            return acc
        }, new Map())
        const result = []
        for (const sameOrderRows of groupedRows.values()) {
            const orderItems = sameOrderRows.map(this.createOrderItem)
            const aRow = sameOrderRows[0]
            result.push(new Order(
                OrderCode.fromValue(aRow.code),
                DateTime.fromISO(aRow.createdAt),
                aRow.buyerCpf,
                orderItems
            ))
        }
        return result;
    }

    private createOrderItem(orderItemRow: OrderItemRow | OrderAggregateRow): OrderItem {
        return new OrderItem(
            orderItemRow.warehouseItemId,
            new Decimal(orderItemRow.paidUnitaryPrice),
            orderItemRow.orderItemQuantity)
    }
}
