import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Coupon from "../../src/domain/entity/Coupon";

function create12Off(): Coupon {
    return new Coupon('12OFF', new Decimal(12), DateTime.fromISO('2020-01-01T12:30'))
}

export default { create12Off }