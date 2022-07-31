import PhysicalAttributes from "./physical-attributes/PhysicalAttributes";

export default class FreightableItem {
    constructor(readonly physicalAttributes: PhysicalAttributes, readonly quantity: number) { }
}
