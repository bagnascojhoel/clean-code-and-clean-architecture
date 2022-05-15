import WeightMeasure from "../src/WeightMeasure";
import { WeightMeasureUnit } from "../src/WeightMeasureUnit";

test('Should be created when using a weight measure unit', () => {
    expect(() => new WeightMeasure(40, WeightMeasureUnit.G)).not.toThrow();
})