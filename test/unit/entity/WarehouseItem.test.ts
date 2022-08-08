
import WarehouseItem from "../../../src/domain/entity/warehouse/WarehouseItem";
import PhysicalAttributesMother from "../../object-mother/PhysicalAttributesMother";

const PHYSICAL_ATTRIBUTES = PhysicalAttributesMother.createCamera();

it('Should be created when all parameters are valid', () => {
    expect(() => new WarehouseItem(123, 'An item', PHYSICAL_ATTRIBUTES, 12)).not.toThrowError();
})