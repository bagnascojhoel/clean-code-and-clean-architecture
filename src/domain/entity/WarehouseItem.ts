import PhysicalAttributes from "./PhysicalAttributes";

export default class WarehouseItem {

    constructor(
        readonly id: number,
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
