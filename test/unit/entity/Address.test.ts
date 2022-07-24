import Address from "../../../src/domain/entity/Address";
import { Distance } from "../../../src/domain/entity/MeasureUnit";
import SpaceMeasure from "../../../src/domain/entity/SpaceMeasure";

test('Should be created when all parameters are valid', () => {
    expect(() => new Address()).not.toThrow();
});

test('Should be 1000km when calculating distance from another address', () => {
    const addressInitial = new Address();
    const addressFinal = new Address();
    const actual = addressInitial.calculateDistance(addressFinal);
    expect(actual).toStrictEqual(new SpaceMeasure('1000', Distance.KM));
});