import PhysicalAttributes from "../physical-attributes/PhysicalAttributes";

export default class WarehouseItem {
    constructor(
        readonly id: WarehouseItemId,
        readonly description: string,
        readonly physicalAttributes: PhysicalAttributes
    ) {
        this.id = id
        this.description = description
        this.physicalAttributes = physicalAttributes
    }
}

export type WarehouseItemId = number
