import Decimal from "decimal.js"
import { DateTime } from "luxon"
import Order from "../../src/domain/entity/Order"
import OrderCode from "../../src/domain/entity/OrderCode"
import OrderItem from "../../src/domain/entity/OrderItem"
import WarehouseItemMother from "./WarehouseItemMother"

function createRubensOrder() {
    const orderItems = [new OrderItem(WarehouseItemMother.createCamera().id, new Decimal(10.99), 10)]
    return new Order(
        new OrderCode(1, 2000),
        DateTime.fromISO('2022-02-01'),
        '96492765052',
        orderItems
    );
}

export default { createRubensOrder }