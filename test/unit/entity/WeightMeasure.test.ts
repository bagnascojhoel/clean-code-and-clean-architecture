import { Weight } from "../../../src/domain/entity/MeasureUnit";
import WeightMeasure from "../../../src/domain/entity/WeightMeasure";

test('Should be created when using a weight measure unit', () => {
    expect(() => new WeightMeasure('40', Weight.G)).not.toThrow();
})

test('Should be 30kg when reading 30000g as kilograms', () => {
    const initialWeightMeasure = new WeightMeasure('30000', Weight.G);
    const expected = new WeightMeasure('30', Weight.KG);
    expect(initialWeightMeasure.as(Weight.KG)).toStrictEqual(expected);
})

test('Should be 30000g when reading 30kg as grams', () => {
    const initialWeightMeasure = new WeightMeasure('30', Weight.KG);
    const expected = new WeightMeasure('30000', Weight.G);
    expect(initialWeightMeasure.as(Weight.G)).toStrictEqual(expected);
})