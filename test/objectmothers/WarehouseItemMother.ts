import WarehouseItem from "../../src/WarehouseItem";
import PhysicalAttributesMother from "./PhysicalAttributesMother";

function createGuitar(): WarehouseItem {
    return new WarehouseItem(
        1,
        'Blue HoxNox T532K',
        10,
        PhysicalAttributesMother.createHandCube()
    );
}

export default { createGuitar }