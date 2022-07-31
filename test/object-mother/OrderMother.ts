import { DateTime } from "luxon";
import Order from "../../src/domain/entity/order/Order";
import OrderCode from "../../src/domain/entity/order/OrderCode";
import OrderItem from "../../src/domain/entity/order/OrderItem";
import WarehouseItemMother from "./WarehouseItemMother";

function createRubensOrder() {
    const orderItems = [new OrderItem(WarehouseItemMother.createCamera().id, 10)]
    return new Order(
        new OrderCode(1, 2000),
        DateTime.fromISO('2022-02-01T05:10'),
        '96492765052',
        orderItems
    );
}

export default { createRubensOrder }