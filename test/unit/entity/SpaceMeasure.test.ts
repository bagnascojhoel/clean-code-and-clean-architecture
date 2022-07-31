import { Area, Distance, SpaceMeasureUnit, Volume } from "../../../src/domain/entity/physical-attributes/MeasureUnit";
import SpaceMeasure from "../../../src/domain/entity/physical-attributes/SpaceMeasure";

test('Should be created when using a space measure unit', () => {
    expect(() => new SpaceMeasure('40', Distance.CM)).not.toThrow();
})

const DIMENSIONAL_CHANGES: SpaceMeasureUnit[][] = [
    [Distance.CM, Area.CM2],
    [Distance.M, Volume.M3],
    [Area.MM2, Distance.MM],
    [Area.MM2, Volume.MM3]
];
test.each(DIMENSIONAL_CHANGES)
    ('Should throw error when converting between units of different dimensions', (current, target) => {
        const space10cm = new SpaceMeasure('10', current);
        expect(() => space10cm.as(target)).toThrowError('Cannot convert to different dimension')
    })

test('Should be 1m when viewing 100cm as meters', () => {
    const current = new SpaceMeasure('100', Distance.CM);
    expect(current.as(Distance.M)).toStrictEqual(new SpaceMeasure('1', Distance.M));
})

test('Should be 23cm when viewing 0.23m as meters', () => {
    const current = new SpaceMeasure('0.23', Distance.M);
    expect(current.as(Distance.CM)).toStrictEqual(new SpaceMeasure('23', Distance.CM));
})

test('Should be 0.0001m³ when viewing 100cm³ as meters', () => {
    const current = new SpaceMeasure('100', Volume.CM3);
    expect(current.as(Volume.M3)).toStrictEqual(new SpaceMeasure('0.0001', Volume.M3));
})

test('Should be 0.03m² when viewing 30000mm² as meters', () => {
    const current = new SpaceMeasure('30000', Area.MM2);
    expect(current.as(Area.M2)).toStrictEqual(new SpaceMeasure('0.03', Area.M2));
})