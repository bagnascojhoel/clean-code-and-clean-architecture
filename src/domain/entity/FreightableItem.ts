import PhysicalAttributes from "./PhysicalAttributes";

export default class FreightableItem {
    constructor(readonly physicalAttributes: PhysicalAttributes, readonly quantity: number) { }
}
