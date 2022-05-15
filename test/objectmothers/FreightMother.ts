import Decimal from "decimal.js";
import Freight from "../../src/Freight";
import AddressMother from "./AddressMother";
import FreightableMother from "./FreightableMother";

function createTenCamerasFromDouglasToRubens(): Freight {
    return new Freight(
        new Decimal(10),
        AddressMother.createDouglasAddress(),
        AddressMother.createRubensAddress(),
        [FreightableMother.createTenCameras()]
    );
}

export default { createTenCamerasFromDouglasToRubens };