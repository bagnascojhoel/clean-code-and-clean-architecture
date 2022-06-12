
import Decimal from "decimal.js";
import WarehouseItem from "../../src/domain/entity/WarehouseItem";
import PhysicalAttributesMother from "../object-mother/PhysicalAttributesMother";

const PHYSICAL_ATTRIBUTES = PhysicalAttributesMother.createCamera();

test('Should be created when all parameters are valid', () => {
    expect(() => new WarehouseItem(123, 'An item', 10, new Decimal(14), PHYSICAL_ATTRIBUTES)).not.toThrowError();
})