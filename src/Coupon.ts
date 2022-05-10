import { DateTime } from "luxon";

export default class Coupon {

    constructor(
        readonly identifier: string,
        readonly discountPercentage: number,
        readonly expirationDate: DateTime
    ) {
        if (this.isBlank(identifier)) throw Error('Coupon must have a non-empty identifier');
        if (discountPercentage < 0) throw Error('Coupon cannot be negative');
        if (expirationDate.diffNow('days').days <= -1) throw Error('Coupon is expired');
        this.identifier = identifier;
        this.discountPercentage = discountPercentage;
        this.expirationDate = expirationDate;
    }

    private isBlank(aString: string): boolean {
        return aString.replace(/\s/, '').length === 0;
    }

    public applyDiscount(initialPrice: number): number {
        return initialPrice * (1 - this.discountPercentage);
    }

}
