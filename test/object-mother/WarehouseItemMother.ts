
import WarehouseItem from "../../src/domain/entity/warehouse/WarehouseItem";
import PhysicalAttributesMother from "./PhysicalAttributesMother";

function createCamera(): WarehouseItem {
    return new WarehouseItem(
        1,
        'Blue HoxNox T532K',
        PhysicalAttributesMother.createCamera(),
        10
    );
}

function createFridge(): WarehouseItem {
    return new WarehouseItem(
        2,
        'Conss 445JKLP1',
        PhysicalAttributesMother.createFridge(),
        12
    )
}

export default { createCamera, createFridge }