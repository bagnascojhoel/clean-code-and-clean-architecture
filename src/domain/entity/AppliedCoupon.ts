import Coupon from "./Coupon";
import Order from "./order/Order";

export default class AppliedCoupon {
    constructor(
        readonly coupon: Coupon,
        readonly order: Order
    ) {

    }
}
