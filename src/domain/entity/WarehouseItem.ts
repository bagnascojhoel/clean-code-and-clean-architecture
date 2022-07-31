import Decimal from "decimal.js";
import PhysicalAttributes from "./PhysicalAttributes";

export type WarehouseItemId = number

export default class WarehouseItem {
    constructor(
        readonly id: WarehouseItemId,
        readonly description: string,
        readonly price: Decimal,
        readonly physicalAttributes: PhysicalAttributes
    ) {
        this.id = id
        this.description = description
        this.price = price
        this.physicalAttributes = physicalAttributes
    }
}

