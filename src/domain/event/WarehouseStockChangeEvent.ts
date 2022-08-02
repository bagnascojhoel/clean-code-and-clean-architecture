import WarehouseStockEntry from "../entity/warehouse/WarehouseStockEntry";
import DomainEvent from "./DomainEvent";

export default class WarehouseStockChangeEvent extends DomainEvent {
    constructor(readonly entries: WarehouseStockEntry[]) {
        super("warehouse-stock-change")
    }
}
