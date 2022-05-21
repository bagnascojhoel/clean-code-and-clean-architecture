import PlaceOrderUseCase from "../../src/domain/usecase/PlaceOrderUseCase";

it('Should be created when parameters are valid', () => {
    expect(() => new PlaceOrderUseCase()).not.toThrow();
    ;
})