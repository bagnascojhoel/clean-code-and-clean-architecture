import Decimal from "decimal.js";
import { BiDimensionalSpace, SingleDimensionalSpace, SpaceMeasureUnit, SpaceMeasureUnitType, TriDimensionalSpace } from "./SpaceMeasureUnit";

export default class SpaceMeasure {
    private availableTargetUnits: SpaceMeasureUnitType;
    readonly value: Decimal;
    readonly unit: SpaceMeasureUnit;

    constructor(value: Decimal.Value, unit: SpaceMeasureUnit) {
        this.value = new Decimal(value);
        this.unit = unit;
        this.availableTargetUnits = this.evaluateTargetUnit();
    }

    public as(targetUnit: SpaceMeasureUnit): SpaceMeasure {
        if (!Object.keys(this.availableTargetUnits).includes(targetUnit.key)) throw new Error('Cannot convert to different dimension');
        const metricValue = this.value.times(this.unit.conversionFactor);
        const targetValue = metricValue.div(targetUnit.conversionFactor);
        return new SpaceMeasure(targetValue, targetUnit);
    }

    private evaluateTargetUnit(): SpaceMeasureUnitType {
        let allowedTargetUnits: SpaceMeasureUnitType = SingleDimensionalSpace;
        if (Object.keys(BiDimensionalSpace).includes(this.unit.key)) allowedTargetUnits = BiDimensionalSpace;
        else if (Object.keys(TriDimensionalSpace).includes(this.unit.key)) allowedTargetUnits = TriDimensionalSpace;
        return allowedTargetUnits;
    }

}
