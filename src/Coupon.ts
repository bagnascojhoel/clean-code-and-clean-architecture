export default class Coupon {

    constructor(readonly identifier: string, readonly discountPercentage: number) {
        if (this.isBlank(identifier)) throw Error('Coupon must have a non-empty identifier');
        if (discountPercentage < 0) throw Error('Coupon cannot be negative');
        this.identifier = identifier;
        this.discountPercentage = discountPercentage;
    }

    private isBlank(aString: string) {
        return aString.replace(/\s/, '').length === 0;
    }

}
