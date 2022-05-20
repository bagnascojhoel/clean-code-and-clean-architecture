import Address from "../../src/domain/entity/Address";
import SpaceMeasure from "../../src/domain/entity/SpaceMeasure";
import { SingleDimensionalSpace } from "../../src/domain/entity/SpaceMeasureUnit";

test('Should be created when all parameters are valid', () => {
    expect(() => new Address()).not.toThrow();
});

test('Should be 1000km when calculating distance from another address', () => {
    const addressInitial = new Address();
    const addressFinal = new Address();
    const actual = addressInitial.calculateDistance(addressFinal);
    expect(actual).toStrictEqual(new SpaceMeasure('1000', SingleDimensionalSpace.KM));
});