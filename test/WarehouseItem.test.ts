import PhysicalAttributes from "../src/PhysicalAttributes";
import SpaceMeasure from "../src/SpaceMeasure";
import WarehouseItem from "../src/WarehouseItem";
import WeightMeasure from "../src/WeightMeasure";
import PhysicalAttributesMother from "./objectmothers/PhysicalAttributesMother";
import WarehouseItemMother from "./objectmothers/WarehouseItemMother";

const PHYSICAL_ATTRIBUTES = PhysicalAttributesMother.createHandCube();

test('Should be created when all parameters are valid', () => {
    expect(() => new WarehouseItem(123, 'An item', 10, PHYSICAL_ATTRIBUTES)).not.toThrowError();
})