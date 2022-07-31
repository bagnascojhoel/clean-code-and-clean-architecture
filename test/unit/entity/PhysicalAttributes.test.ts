import Decimal from "decimal.js";
import { Distance, Volume, Weight } from "../../../src/domain/entity/physical-attributes/MeasureUnit";
import PhysicalAttributes from "../../../src/domain/entity/physical-attributes/PhysicalAttributes";
import SpaceMeasure from "../../../src/domain/entity/physical-attributes/SpaceMeasure";
import WeightMeasure from "../../../src/domain/entity/physical-attributes/WeightMeasure";

const SPACE_MEASURE = new SpaceMeasure('10', Distance.CM);
const WEIGHT_MEASURE = new WeightMeasure('500', Weight.G);

test('Should be created when all parameters are valid', () => {
    expect(() => new PhysicalAttributes(SPACE_MEASURE, SPACE_MEASURE, SPACE_MEASURE, WEIGHT_MEASURE)).not.toThrow();
})

test('Should throw error when space measures are not same unit', () => {
    const cmMeasure = new SpaceMeasure('100', Distance.CM);
    const mMeasure = new SpaceMeasure('100', Distance.M);
    expect(() => new PhysicalAttributes(cmMeasure, cmMeasure, mMeasure, WEIGHT_MEASURE)).toThrowError('Physical attributes\'s space measures must all use same unit');
})

test('Should have volume 0.003m³ when object is 20x15x10cm', () => {
    const physicalAttributes = new PhysicalAttributes(
        new SpaceMeasure('20', Distance.CM),
        new SpaceMeasure('15', Distance.CM),
        new SpaceMeasure('10', Distance.CM),
        new WeightMeasure('20', Weight.KG),
    );
    expect(physicalAttributes.metricVolume).toStrictEqual(new SpaceMeasure('0.003', Volume.M3));
})

test('Should have density 100 when object is 100x30x10cm and weights 3kg', () => {
    const physicalAttributes = new PhysicalAttributes(
        new SpaceMeasure('100', Distance.CM),
        new SpaceMeasure('30', Distance.CM),
        new SpaceMeasure('10', Distance.CM),
        new WeightMeasure(3, Weight.KG),
    );
    expect(physicalAttributes.kilogramMetricDensity).toStrictEqual(new Decimal('100'));
})