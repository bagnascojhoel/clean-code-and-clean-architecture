import Decimal from "decimal.js";
import PhysicalAttributes from "../src/PhysicalAttributes"
import SpaceMeasure from "../src/SpaceMeasure";
import { SingleDimensionalSpace, TriDimensionalSpace } from "../src/SpaceMeasureUnit";
import WeightMeasure from "../src/WeightMeasure";
import { WeightMeasureUnit } from "../src/WeightMeasureUnit";

const SPACE_MEASURE = new SpaceMeasure('10', SingleDimensionalSpace.CM);
const WEIGHT_MEASURE = new WeightMeasure('500', WeightMeasureUnit.G);

test('Should be created when all parameters are valid', () => {
    expect(() => new PhysicalAttributes(SPACE_MEASURE, SPACE_MEASURE, SPACE_MEASURE, WEIGHT_MEASURE)).not.toThrow();
})

test('Should throw error when space measures are not same unit', () => {
    const cmMeasure = new SpaceMeasure('100', SingleDimensionalSpace.CM);
    const mMeasure = new SpaceMeasure('100', SingleDimensionalSpace.M);
    expect(() => new PhysicalAttributes(cmMeasure, cmMeasure, mMeasure, WEIGHT_MEASURE)).toThrowError('Physical attributes\'s space measures must all use same unit');
})

test('Should have volume 0.003m³ when object is 20x15x10cm', () => {
    const physicalAttributes = new PhysicalAttributes(
        new SpaceMeasure('20', SingleDimensionalSpace.CM),
        new SpaceMeasure('15', SingleDimensionalSpace.CM),
        new SpaceMeasure('10', SingleDimensionalSpace.CM),
        new WeightMeasure('20', WeightMeasureUnit.KG),
    );
    expect(physicalAttributes.metricVolume).toStrictEqual(new SpaceMeasure('0.003', TriDimensionalSpace.M3));
})

// test('Should have density 100 when object is 100x30x10cm and weights 3kg', () => {
//     const physicalAttributes = new PhysicalAttributes(
//         new SpaceMeasure('100', SingleDimensionalSpace.CM),
//         new SpaceMeasure('30', SingleDimensionalSpace.CM),
//         new SpaceMeasure('10', SingleDimensionalSpace.CM),
//         new WeightMeasure(3, WeightMeasureUnit.KG),
//     );
//     expect(physicalAttributes.kilogramMetricDensity).toStrictEqual(new Decimal('100'));
// })