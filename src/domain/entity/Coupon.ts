import Decimal from "decimal.js";
import { DateTime } from "luxon";

export default class Coupon {

    constructor(
        readonly name: string,
        readonly discountPercentage: Decimal,
        readonly expirationDate: DateTime
    ) {
        if (this.isBlank(name)) throw Error('Coupon must have a non-empty identifier');
        if (discountPercentage.isNegative()) throw Error('Coupon cannot be negative');
        // if () throw Error('Coupon is expired');
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

    public hasExpired(today: DateTime): boolean {
        return this.expirationDate.diff(today, 'minutes').minutes <= -1
    }

}
