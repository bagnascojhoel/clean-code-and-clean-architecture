import Decimal from "decimal.js";
import { create } from "lodash";
import { DateTime } from "luxon";
import { Distance, Weight } from "../../domain/entity/MeasureUnit";
import Order from "../../domain/entity/Order";
import OrderCode from '../../domain/entity/OrderCode';
import OrderItem from "../../domain/entity/OrderItem";
import PhysicalAttributes from "../../domain/entity/PhysicalAttributes";
import SpaceMeasure from "../../domain/entity/SpaceMeasure";
import WarehouseItem from "../../domain/entity/WarehouseItem";
import WeightMeasure from "../../domain/entity/WeightMeasure";
import OrderRepository from "../../domain/repository/OrderRepository";
import DatabaseConnection from "../database/DatabaseConnection";

const TABLE_ORDER = '`order`'
const TABLE_ORDER_ITEM = 'order_item'
const TABLE_WAREHOUSE_ITEM = 'warehouse_item'

const TABLE_ORDER_COLUMNS = `
    o.order_id as orderId,
    o.code,
    o.buyer_cpf as buyerCpf,
    o.created_at as createdAt
`
const ORDER_ITEM_VALUES = `
    oi.paid_unitary_price as paidUnitaryPrice,
    oi.quantity as orderItemQuantity
`
const WAREHOUSE_ITEM_VALUES = `
    wi.warehouse_item_id as warehouseItemId,
    wi.description,
    wi.price as warehouseItemPrice,
    wi.quantity as warehouseItemQuantity,
    wi.metric_width as metricWidth,
    wi.metric_length as metricLength,
    wi.metric_height as metricHeight,
    wi.kilogram_weight as kilogramWeight
`

type OrderRow = {
    orderId: number
    code: string
    buyerCpf: string
    createdAt: string
}

type OrderItemRow = {
    paidUnitaryPrice: number
    orderItemQuantity: number
    warehouseItemId: number
    warehouseItemPrice: number
    description: string
    warehouseItemQuantity: number
    metricWidth: number
    metricLength: number
    metricHeight: number
    kilogramWeight: number
}

export default class OrderRepositoryDatabase implements OrderRepository {
    private connection: DatabaseConnection

    constructor(conn: DatabaseConnection) {
        this.connection = conn
    }

    public async save(order: Order): Promise<OrderCode> {
        const insertOrderStatement = `
        INSERT INTO ${TABLE_ORDER}
            (order_id, code, buyer_cpf, created_at)
        VALUES
            (?, ?, ?, ?)
        `
        await this.connection.query(
            insertOrderStatement,
            [order.code.sequentialId, order.code.value, order.cpf.value, order.createdAt.toISO()]
        )
        await this.insertOrderItems(order.code, order.items)
        return order.code
    }

    public async count(): Promise<number> {
        const statement = `SELECT count(1) as total FROM ${TABLE_ORDER}`
        const [{ total }] = await this.connection.query(statement)
        return total
    }

    public async findOne(orderCode: OrderCode): Promise<Order | null> {
        const statementOrder = `
        SELECT ${TABLE_ORDER_COLUMNS}
        FROM ${TABLE_ORDER} as o
        WHERE o.code = ?
        `
        const [orderRow]: OrderRow[] = await this.connection.query(statementOrder, orderCode.value)
        if (!orderRow) return null
        const orderItems: OrderItem[] = await this.findOrderItems(orderCode)
        return new Order(
            orderCode,
            DateTime.fromISO(orderRow.createdAt),
            orderRow.buyerCpf,
            orderItems
        )
    }

    private async findOrderItems(orderCode: OrderCode): Promise<OrderItem[]> {
        const statement = `
        SELECT
            ${ORDER_ITEM_VALUES},
            ${WAREHOUSE_ITEM_VALUES}
        FROM ${TABLE_ORDER_ITEM} oi
        JOIN ${TABLE_WAREHOUSE_ITEM} wi
        ON oi.warehouse_item_id = wi.warehouse_item_id
        WHERE oi.order_code = ?
        `
        const queryResult: OrderItemRow[] = await this.connection.query(statement, orderCode.value)
        return queryResult.map(this.createOrderItem)
    }

    private createOrderItem(orderItemRow: OrderItemRow): OrderItem {
        const physicalAttributes = new PhysicalAttributes(
            new SpaceMeasure(orderItemRow.metricWidth, Distance.M),
            new SpaceMeasure(orderItemRow.metricLength, Distance.M),
            new SpaceMeasure(orderItemRow.metricHeight, Distance.M),
            new WeightMeasure(orderItemRow.kilogramWeight, Weight.KG)
        )
        const warehouseItem = new WarehouseItem(
            orderItemRow.warehouseItemId,
            orderItemRow.description,
            orderItemRow.warehouseItemQuantity,
            new Decimal(orderItemRow.warehouseItemPrice),
            physicalAttributes
        )
        return new OrderItem(warehouseItem, new Decimal(orderItemRow.paidUnitaryPrice), orderItemRow.orderItemQuantity)
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
            values.push(orderCode.value, item.warehouseItem.id, item.paidUnitaryPrice.toNumber(), item.quantity())
        }
        const statement = statementPrefix + statementValues.join(',')
        await this.connection.query(statement, values)
    }

}
