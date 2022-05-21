import SpaceMeasure from "../../src/domain/entity/SpaceMeasure";
import { BiDimensionalSpace, SingleDimensionalSpace, SpaceMeasureUnit, TriDimensionalSpace } from "../../src/domain/entity/SpaceMeasureUnit";


test('Should be created when using a space measure unit', () => {
    expect(() => new SpaceMeasure('40', SingleDimensionalSpace.CM)).not.toThrow();
})

const DIMENSIONAL_CHANGES: SpaceMeasureUnit[][] = [
    [SingleDimensionalSpace.CM, BiDimensionalSpace.CM2],
    [SingleDimensionalSpace.M, TriDimensionalSpace.M3],
    [BiDimensionalSpace.MM2, SingleDimensionalSpace.MM],
    [BiDimensionalSpace.MM2, TriDimensionalSpace.MM3]
];
test.each(DIMENSIONAL_CHANGES)
    ('Should throw error when converting between units of different dimensions', (current, target) => {
        const space10cm = new SpaceMeasure('10', current);
        expect(() => space10cm.as(target)).toThrowError('Cannot convert to different dimension')
    })

test('Should be 1m when viewing 100cm as meters', () => {
    const current = new SpaceMeasure('100', SingleDimensionalSpace.CM);
    expect(current.as(SingleDimensionalSpace.M)).toStrictEqual(new SpaceMeasure('1', SingleDimensionalSpace.M));
})

test('Should be 23cm when viewing 0.23m as meters', () => {
    const current = new SpaceMeasure('0.23', SingleDimensionalSpace.M);
    expect(current.as(SingleDimensionalSpace.CM)).toStrictEqual(new SpaceMeasure('23', SingleDimensionalSpace.CM));
})

test('Should be 0.0001m³ when viewing 100cm³ as meters', () => {
    const current = new SpaceMeasure('100', TriDimensionalSpace.CM3);
    expect(current.as(TriDimensionalSpace.M3)).toStrictEqual(new SpaceMeasure('0.0001', TriDimensionalSpace.M3));
})

test('Should be 0.03m² when viewing 30000mm² as meters', () => {
    const current = new SpaceMeasure('30000', BiDimensionalSpace.MM2);
    expect(current.as(BiDimensionalSpace.M2)).toStrictEqual(new SpaceMeasure('0.03', BiDimensionalSpace.M2));
})