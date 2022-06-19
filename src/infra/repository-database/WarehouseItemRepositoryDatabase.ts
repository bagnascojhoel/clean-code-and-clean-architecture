import Decimal from "decimal.js";
import { Distance, Weight } from "../../domain/entity/MeasureUnit";
import PhysicalAttributes from "../../domain/entity/PhysicalAttributes";
import SpaceMeasure from "../../domain/entity/SpaceMeasure";
import WarehouseItem from "../../domain/entity/WarehouseItem";
import WeightMeasure from "../../domain/entity/WeightMeasure";
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";
import DatabaseConnection from "../database/DatabaseConnection";

const TABLE_WAREHOUSE_ITEM = 'warehouse_item'
const TABLE_WAREHOUSE_ITEM_COLUMNS = `
    warehouse_item_id as id,
    description,
    quantity,
    price,
    metric_width as metricWidth,
    metric_length as metricLength,
    metric_height as metricHeight,
    kilogram_weight as kilogramWeight
`

export default class WarehouseItemRepositoryDatabase implements WarehouseItemRepository {

    constructor(private connection: DatabaseConnection) {
        this.connection = connection;
    }

    public async insert(warehouseItem: WarehouseItem): Promise<number> {
        const statement = `
        INSERT INTO ${TABLE_WAREHOUSE_ITEM}
            (description, quantity, price, metric_width, metric_length, metric_height, kilogram_weight)
        VALUES
            (?, ?, ?, ?, ?, ?, ?)
        RETURNING warehouse_item_id as warehouseItemId
        `
        const [{ warehouseItemId }] = await this.connection.query(
            statement,
            [
                warehouseItem.description,
                warehouseItem.quantity,
                warehouseItem.price,
                warehouseItem.physicalAttributes.widthX.as(Distance.M).value,
                warehouseItem.physicalAttributes.lengthY.as(Distance.M).value,
                warehouseItem.physicalAttributes.heightZ.as(Distance.M).value,
                warehouseItem.physicalAttributes.weight.as(Weight.KG).value
            ]
        )
        return warehouseItemId
    }

    public async findOne(id: number): Promise<WarehouseItem | null> {
        const statement = `
            SELECT ${TABLE_WAREHOUSE_ITEM_COLUMNS}
            FROM ${TABLE_WAREHOUSE_ITEM}
            WHERE id = ?
        `
        const [warehouseItemRow]: WarehouseItemRow[] = await this.connection.query(statement, id)
        return warehouseItemRow ? this.createWarehouseItem(warehouseItemRow) : null
    }

    public async findAll(ids: number[]): Promise<WarehouseItem[]> {
        const bindIds = ids.map(id => '?').join(',')
        const statement = `
            SELECT ${TABLE_WAREHOUSE_ITEM_COLUMNS}
            FROM ${TABLE_WAREHOUSE_ITEM}
            WHERE id IN (${bindIds})
        `
        return (await this.connection.query(statement, ids))
            .map(this.createWarehouseItem)
    }

    private createWarehouseItem(
        { id, description, quantity, price, metricHeight, metricLength, metricWidth, kilogramWeight }: WarehouseItemRow
    ): WarehouseItem {
        const physicalAttributes = new PhysicalAttributes(
            new SpaceMeasure(metricWidth, Distance.M),
            new SpaceMeasure(metricHeight, Distance.M),
            new SpaceMeasure(metricLength, Distance.M),
            new WeightMeasure(kilogramWeight, Weight.KG)
        )
        return new WarehouseItem(id, description, quantity, new Decimal(price), physicalAttributes)
    }

}

type WarehouseItemRow = {
    id: number
    description: string
    quantity: number
    price: number
    metricWidth: number
    metricLength: number
    metricHeight: number
    kilogramWeight: number
}
