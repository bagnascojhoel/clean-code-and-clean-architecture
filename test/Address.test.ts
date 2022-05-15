import Address from "../src/Address";

test('Should be created when all parameters are valid', () => {
    expect(() => new Address()).not.toThrow();
});

test('Should be 1000 when calculating distance from another address', () => {
    const addressInitial = new Address();
    const addressFinal = new Address();
    const actual = addressInitial.calculateDistance(addressFinal);
    expect(actual).toBe(1000);
});