import { DateTime } from "luxon"
import WarehouseItemMother from "./WarehouseItemMother"
import AddressMother from "./AddressMother"
import FreightableMother from "./FreightableMother"
import Decimal from "decimal.js"
import OrderItem from "../../src/domain/entity/OrderItem"
import Order from "../../src/domain/entity/Order"
import Freight from "../../src/domain/entity/Freight"

function createRubensOrder() {
    const orderItems = [new OrderItem(WarehouseItemMother.createCamera(), new Decimal(10.99), 10)]
    const items = [FreightableMother.createTenCameras()]
    return new Order(
        1,
        DateTime.fromISO('2022-02-01'),
        '96492765052',
        new Freight(new Decimal(10), AddressMother.createRubensAddress(), AddressMother.createDouglasAddress(), items),
        orderItems
    );
}

export default { createRubensOrder }