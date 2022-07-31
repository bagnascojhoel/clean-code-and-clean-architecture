import Decimal from "decimal.js";
import { DateTime } from "luxon";
import WarehousePriceEntry from "../../../domain/entity/warehouse/WarehousePriceEntry";
import WarehousePriceEntryRepository from "../../../domain/repository/WarehousePriceEntryRepository";
import DatabaseConnection from "../DatabaseConnection";

export default class WarehousePriceEntryRepositoryDatabase implements WarehousePriceEntryRepository {
    constructor(private connection: DatabaseConnection) { }

    public async create(entry: WarehousePriceEntry): Promise<number> {
        const statement = `INSERT INTO warehouse_price_entry (warehouse_item_id, new_price, effective_since)
            VALUES (?, ?, ?)
            RETURNING warehouse_price_entry_id as id`
        const [{ id }] = await this.connection.query(statement, [entry.warehouseItemId, entry.newPrice, entry.effectiveSince.toISO()])
        return id
    }

    public async findAllEffectiveOn(warehouseItemId: number, on: DateTime): Promise<WarehousePriceEntry[]> {
        const statement = `
            SELECT
                new_price newPrice,
                effective_since effectiveSince
            FROM warehouse_price_entry
            WHERE
                1 = 1
                AND warehouse_item_id = ?
                AND effectiveSince <= ?
        `
        type Row = { newPrice: string, effectiveSince: string }
        const rows: Row[] = await this.connection.query(statement, [warehouseItemId, on.toISO()])
        return rows.map(row => WarehousePriceEntry.for(warehouseItemId, new Decimal(row.newPrice), DateTime.fromISO(row.effectiveSince)))
    }
}
