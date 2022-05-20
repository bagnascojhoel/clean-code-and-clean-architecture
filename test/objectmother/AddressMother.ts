import Address from "../../src/domain/entity/Address";


function createRubensAddress(): Address {
    return new Address();
}

function createDouglasAddress(): Address {
    return new Address();
}

export default { createRubensAddress, createDouglasAddress };