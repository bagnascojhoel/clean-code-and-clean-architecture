import WeightMeasure from "../../src/domain/entity/WeightMeasure";
import WeightMeasureUnit from "../../src/domain/entity/WeightMeasureUnit";

test('Should be created when using a weight measure unit', () => {
    expect(() => new WeightMeasure('40', WeightMeasureUnit.G)).not.toThrow();
})

test('Should be 30kg when reading 30000g as kilograms', () => {
    const initialWeightMeasure = new WeightMeasure('30000', WeightMeasureUnit.G);
    const expected = new WeightMeasure('30', WeightMeasureUnit.KG);
    expect(initialWeightMeasure.as(WeightMeasureUnit.KG)).toStrictEqual(expected);
})

test('Should be 30000g when reading 30kg as grams', () => {
    const initialWeightMeasure = new WeightMeasure('30', WeightMeasureUnit.KG);
    const expected = new WeightMeasure('30000', WeightMeasureUnit.G);
    expect(initialWeightMeasure.as(WeightMeasureUnit.G)).toStrictEqual(expected);
})