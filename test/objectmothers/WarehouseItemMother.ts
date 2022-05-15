import WarehouseItem from "../../src/WarehouseItem";
import PhysicalAttributesMother from "./PhysicalAttributesMother";

function createCamera(): WarehouseItem {
    return new WarehouseItem(
        1,
        'Blue HoxNox T532K',
        10,
        PhysicalAttributesMother.createCamera()
    );
}

export default { createCamera }