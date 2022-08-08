import PhysicalAttributes from "../physical-attributes/PhysicalAttributes";

export default class WarehouseItem {
    constructor(
        readonly id: WarehouseItemId,
        readonly description: string,
        readonly physicalAttributes: PhysicalAttributes,
        public quantity: number
    ) { }
}

export type WarehouseItemId = number
