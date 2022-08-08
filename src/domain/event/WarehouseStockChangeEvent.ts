import WarehouseStockEntry from "../entity/warehouse/WarehouseStockEntry";
import DomainEvent from "./DomainEvent";

export default class WarehouseStockChangeEvent extends DomainEvent {
    private constructor(readonly entries: WarehouseStockEntry[]) {
        super("warehouse-stock-change")
    }

    public static of(entries: WarehouseStockEntry[]): WarehouseStockChangeEvent {
        return new WarehouseStockChangeEvent(entries)
    }
}
