import Decimal from "decimal.js";
import Order from "./Order";

const SEQUENTIAL_ID_CODE_SECTION_LENGTH = 8;

export default class OrderCode {
    private _value: string

    constructor(sequentialId: number, creationYear: number) {
        if (sequentialId < 0) throw new Error('Order code must have a non-negative sequential ID')
        if (`${sequentialId}`.length > SEQUENTIAL_ID_CODE_SECTION_LENGTH) throw new Error('Order code cannot handle this too large sequential ID')
        if (creationYear < 0) throw new Error('Order code must have a non-negative creation year')
        this._value = this.generate(sequentialId, creationYear)
    }

    public static fromValue(value: string): OrderCode {
        const result = new OrderCode(0, 0)
        result._value = value
        return result
    }

    public get value(): string {
        return this._value
    }

    private generate(sequentialId: number, creationYear: number): string {
        const paddedId = new Decimal(sequentialId).toString().padStart(SEQUENTIAL_ID_CODE_SECTION_LENGTH, '0');
        return `${creationYear}${paddedId}`;
    }
}
