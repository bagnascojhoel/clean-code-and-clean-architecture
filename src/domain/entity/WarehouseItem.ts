import PhysicalAttributes from "./PhysicalAttributes";

export type WarehouseItemId = number

export default class WarehouseItem {

    constructor(
        readonly id: WarehouseItemId,
        readonly description: string,
        readonly quantity: number,
        readonly physicalAttributes: PhysicalAttributes
    ) {
        this.id = id;
        this.description = description;
        this.quantity = quantity;
        this.physicalAttributes = physicalAttributes;
    }

}

