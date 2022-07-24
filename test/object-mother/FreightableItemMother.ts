
import FreightableItem from "../../src/domain/entity/FreightableItem";
import PhysicalAttributesMother from "./PhysicalAttributesMother";

function createTenCameras(): FreightableItem {
    return new FreightableItem(PhysicalAttributesMother.createCamera(), 10)
}

export default { createTenCameras };