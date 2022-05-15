import { WeightMeasureUnit } from "./WeightMeasureUnit";

export default class WeightMeasure {

    constructor(readonly value: number, readonly unit: WeightMeasureUnit) {
        this.value = value;
        this.unit = unit;
    }

}
