export default class WarehouseItem {
    private id: number;
    readonly description: string;
    readonly quantity: number;

    constructor(id: number, description: string, quantity: number) {
        this.id = id;
        this.description = description;
        this.quantity = quantity;
    }

}
