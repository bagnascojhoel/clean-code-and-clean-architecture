import { DateTime } from "luxon";
import WarehouseStockEntry from "../../../domain/entity/warehouse/WarehouseStockEntry";
import WarehouseStockEntryRepository from "../../../domain/repository/WarehouseStockEntryRepository";
import DatabaseConnection from "../DatabaseConnection";

export default class WarehouseStockEntryRepositoryDatabase implements WarehouseStockEntryRepository {

    constructor(private readonly connection: DatabaseConnection) { }

    async insert(entries: WarehouseStockEntry[]): Promise<void> {
        if (!entries.length) return;
        let statement = `
            INSERT INTO warehouse_stock_entry
                (entry_type, warehouse_item_id, quantity, registered_at)
            VALUES
        `
        const values = []
        for (const entry of entries) {
            statement += ` (?, ?, ?, ?),`
            values.push(entry.entryType, entry.warehouseItemId, entry.quantity, entry.registeredAt.toUTC().toISO())
        }
        statement = statement.substring(0, statement.length - 1)
        await this.connection.query(statement, values)
    }

    async findAll(warehouseItemId: number): Promise<WarehouseStockEntry[]> {
        const statement = `
            SELECT
                entry_type entryType,
                warehouse_item_id warehouseItemId,
                quantity,
                registered_at registeredAt
            FROM
                warehouse_stock_entry
            WHERE
                warehouse_item_id = ?
        `
        const result = await this.connection.query(statement, warehouseItemId)
        return result.map((row: any) => {
            return WarehouseStockEntry.of(
                row.entryType,
                row.warehouseItemId,
                row.quantity,
                DateTime.fromISO(row.registeredAt))
        })
    }
}
