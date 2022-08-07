import OrderCancelledEvent from "../../../src/domain/event/OrderCancelledEvent";
import OrderMother from "../OrderMother";

function cancelledDouglasOrder(): OrderCancelledEvent {
    return new OrderCancelledEvent(OrderMother.createRubensOrder())
}

export default { cancelledDouglasOrder }