import Freightable from "../../src/Freightable";
import PhysicalAttributesMother from "./PhysicalAttributesMother";

function createTenCameras(): Freightable {
    return <Freightable>{
        quantity() {
            return 10;
        },
        unitaryPhysicalAttributes() {
            return PhysicalAttributesMother.createCamera();
        }
    }
}

export default { createTenCameras };