
import WarehouseItem from "../../src/domain/entity/WarehouseItem";
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