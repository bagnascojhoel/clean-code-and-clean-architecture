import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Coupon from "../../src/domain/entity/Coupon";

function create12OffUntilJanuary2020(): Coupon {
    return new Coupon('12OFF', new Decimal(0.12), DateTime.fromISO('2020-01-01T12:30'))
}

function create10OffUntilJanuary2023(): Coupon {
    return new Coupon('10OFF2023', new Decimal(0.1), DateTime.fromISO('2023-01-01'))
}

export default { create12OffUntilJanuary2020, create10OffUntilJanuary2023 }