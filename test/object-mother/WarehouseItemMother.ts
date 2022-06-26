
import Decimal from "decimal.js";
import WarehouseItem from "../../src/domain/entity/WarehouseItem";
import PhysicalAttributesMother from "./PhysicalAttributesMother";

function createCamera(): WarehouseItem {
    return new WarehouseItem(
        1,
        'Blue HoxNox T532K',
        10,
        new Decimal('100.999'),
        PhysicalAttributesMother.createCamera()
    );
}

function createFridge(): WarehouseItem {
    return new WarehouseItem(
        2,
        'Conss 445JKLP1',
        1255,
        new Decimal('3000'),
        PhysicalAttributesMother.createFridge()
    )
}

export default { createCamera, createFridge }