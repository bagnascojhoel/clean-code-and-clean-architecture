import Decimal from "decimal.js";
import { DateTime } from "luxon";

export default class Coupon {

    constructor(
        readonly name: string,
        readonly discountPercentage: Decimal,
        readonly expirationDate: DateTime
    ) {
        if (this.isBlank(name)) throw 'Coupon must have a non-empty identifier';
        if (discountPercentage.isNegative()) throw 'Coupon cannot have negative discount';
        if (discountPercentage.greaterThanOrEqualTo(1)) throw 'Coupon cannot have discount greater or equal to 100% (1)'
        this.name = name;
        this.discountPercentage = discountPercentage;
        this.expirationDate = expirationDate;
    }

    private isBlank(aString: string): boolean {
        return aString.replace(/\s/, '').length === 0;
    }

    public calculateDiscount(appliedAt: DateTime, base: Decimal): Decimal {
        return this.hasExpired(appliedAt) ? new Decimal(0) : base.times(this.discountPercentage);
    }

    public calculateDiscountedPrice(appliedAt: DateTime, base: Decimal): Decimal {
        return base.minus(this.calculateDiscount(appliedAt, base))
    }

    public hasExpired(today: DateTime): boolean {
        return this.expirationDate.diff(today, 'minutes').minutes <= -1
    }

}
