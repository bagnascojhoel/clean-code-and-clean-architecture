import Decimal from "decimal.js";
import { WeightMeasureUnit } from "./WeightMeasureUnit";

export default class WeightMeasure {
    readonly value: Decimal;

    constructor(value: Decimal.Value, readonly unit: WeightMeasureUnit) {
        this.value = new Decimal(value);
        this.unit = unit;
    }

    public as(targetUnit: WeightMeasureUnit): WeightMeasure {
        const gramValue = this.value.times(this.unit.conversionFactor);
        const targetValue = gramValue.div(targetUnit.conversionFactor);
        return new WeightMeasure(targetValue, targetUnit);
    }

}
