import PhysicalAttributes from "./PhysicalAttributes";

export default interface Freightable {
    quantity(): number;
    unitaryPhysicalAttributes(): PhysicalAttributes;
}
