import Decimal from "decimal.js";
import Order from "./Order";

const SEQUENTIAL_ID_CODE_SECTION_LENGTH = 8;

export default class OrderCode {
    readonly value: string

    constructor(readonly sequentialId: number, readonly creationYear: number) {
        if (sequentialId < 0) throw new Error('Order code must have a non-negative sequential ID')
        if (`${sequentialId}`.length > SEQUENTIAL_ID_CODE_SECTION_LENGTH) throw new Error('Order code cannot handle this too large sequential ID')
        if (creationYear < 0) throw new Error('Order code must have a non-negative creation year')
        this.sequentialId = sequentialId
        this.creationYear = creationYear
        this.value = this.generate()
    }

    private generate(): string {
        const paddedId = new Decimal(this.sequentialId).toString().padStart(SEQUENTIAL_ID_CODE_SECTION_LENGTH, '0');
        return `${this.creationYear}${paddedId}`;
    }

}
