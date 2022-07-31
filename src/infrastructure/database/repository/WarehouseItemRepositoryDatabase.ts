import { Distance, Weight } from "../../../domain/entity/physical-attributes/MeasureUnit";
import PhysicalAttributes from "../../../domain/entity/physical-attributes/PhysicalAttributes";
import SpaceMeasure from "../../../domain/entity/physical-attributes/SpaceMeasure";
import WeightMeasure from "../../../domain/entity/physical-attributes/WeightMeasure";
import WarehouseItem from "../../../domain/entity/warehouse/WarehouseItem";
import WarehouseItemRepository from "../../../domain/repository/WarehouseItemRepository";
import DatabaseConnection from "../DatabaseConnection";

const TABLE_WAREHOUSE_ITEM = 'warehouse_item'
const TABLE_WAREHOUSE_ITEM_COLUMNS = `
    warehouse_item_id as id,
    description,
    metric_width as metricWidth,
    metric_length as metricLength,
    metric_height as metricHeight,
    kilogram_weight as kilogramWeight
`

export default class WarehouseItemRepositoryDatabase implements WarehouseItemRepository {

    constructor(private connection: DatabaseConnection) {
        this.connection = connection;
    }

    public async save(warehouseItem: WarehouseItem): Promise<void> {
        const statement = `
        INSERT INTO ${TABLE_WAREHOUSE_ITEM}
            (warehouse_item_id, description, metric_width, metric_length, metric_height, kilogram_weight)
        VALUES
            (?, ?, ?, ?, ?, ?)
        ON CONFLICT(warehouse_item_id) DO UPDATE SET
            description = excluded.description,
            metric_width = excluded.metric_width,
            metric_length = excluded.metric_length,
            metric_height = excluded.metric_height,
            kilogram_weight = excluded.kilogram_weight

        `
        await this.connection.query(
            statement,
            [
                warehouseItem.id,
                warehouseItem.description,
                warehouseItem.physicalAttributes.widthX.as(Distance.M).value,
                warehouseItem.physicalAttributes.lengthY.as(Distance.M).value,
                warehouseItem.physicalAttributes.heightZ.as(Distance.M).value,
                warehouseItem.physicalAttributes.weight.as(Weight.KG).value
            ]
        )
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

    public async exists(ids: number[]): Promise<boolean> {
        const statement = `SELECT count(1) as total FROM ${TABLE_WAREHOUSE_ITEM} WHERE warehouse_item_id IN (${ids})`
        const [{ total }] = await this.connection.query(statement)
        return total === ids.length
    }

    private createWarehouseItem(
        { id, description, metricHeight, metricLength, metricWidth, kilogramWeight }: WarehouseItemRow
    ): WarehouseItem {
        const physicalAttributes = new PhysicalAttributes(
            new SpaceMeasure(metricWidth, Distance.M),
            new SpaceMeasure(metricHeight, Distance.M),
            new SpaceMeasure(metricLength, Distance.M),
            new WeightMeasure(kilogramWeight, Weight.KG)
        )
        return new WarehouseItem(id, description, physicalAttributes)
    }

}

type WarehouseItemRow = {
    id: number
    description: string
    metricWidth: number
    metricLength: number
    metricHeight: number
    kilogramWeight: number
}
