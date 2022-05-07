export class OrderItem {
    private _description: string;
    private _unitaryPrice: number;
    private _quantity: number;

    constructor(price: number, quantity: number, description: string) {
        if (price <= 0) throw new Error('Price cannot be zero or negative');
        if (quantity <= 0) throw new Error('Quantity cannot be zero or negative');
        this._description = description;
        this._unitaryPrice = price;
        this._quantity = quantity;
    }

    public get totalPrice() {
        return this._unitaryPrice * this._quantity;
    }

}
