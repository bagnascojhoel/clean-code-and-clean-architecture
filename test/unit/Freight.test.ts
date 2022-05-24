import Decimal from "decimal.js";
import Sinon from "sinon";
import Freight from "../../src/domain/entity/Freight";
import SpaceMeasure from "../../src/domain/entity/SpaceMeasure";
import { SingleDimensionalSpace } from "../../src/domain/entity/SpaceMeasureUnit";
import AddressMother from "../object-mother/AddressMother";
import FreightableMother from "../object-mother/FreightableMother";

afterEach(() => {
    Sinon.restore();
})

test('Should be created when all parameters are valid', () => {
    const origin = AddressMother.createDouglasAddress();
    const destination = AddressMother.createRubensAddress();
    const item = FreightableMother.createTenCameras();
    expect(() => new Freight(new Decimal(10), origin, destination, [item])).not.toThrow();
});

test('Should be 99 when calculating price for 10 cameras 1000m away from each other', () => {
    const douglasAddress = Sinon.stub(AddressMother.createDouglasAddress())
    const rubensAddress = Sinon.stub(AddressMother.createRubensAddress());
    const tenCameras = FreightableMother.createTenCameras();
    const freight = new Freight(new Decimal(10), douglasAddress, rubensAddress, [tenCameras]);
    douglasAddress.calculateDistance.returns(new SpaceMeasure('1000', SingleDimensionalSpace.KM));
    rubensAddress.calculateDistance.returns(new SpaceMeasure('1000', SingleDimensionalSpace.KM));
    expect(freight.calculatePrice()).toStrictEqual(new Decimal('99.9'))
})

test('Should be 99 when calculating price for 10 cameras 1000m away from each other', () => {
    const douglasAddress = Sinon.stub(AddressMother.createDouglasAddress())
    const rubensAddress = Sinon.stub(AddressMother.createRubensAddress());
    const tenCameras = FreightableMother.createTenCameras();
    const freight = new Freight(new Decimal(10), douglasAddress, rubensAddress, [tenCameras]);
    douglasAddress.calculateDistance.returns(new SpaceMeasure('1000', SingleDimensionalSpace.KM));
    rubensAddress.calculateDistance.returns(new SpaceMeasure('1000', SingleDimensionalSpace.KM));
    expect(freight.calculatePrice()).toStrictEqual(new Decimal('99.9'))
})

test('Should be 10 when calculated price is less than the minimum 10', () => {
    const rubensAddress = Sinon.stub(AddressMother.createRubensAddress());
    const tenCameras = FreightableMother.createTenCameras()
    const freight = new Freight(new Decimal(10), rubensAddress, rubensAddress, [tenCameras])
    rubensAddress.calculateDistance.returns(new SpaceMeasure(0, SingleDimensionalSpace.KM))
    expect(freight.calculatePrice()).toStrictEqual(new Decimal('10'))
})