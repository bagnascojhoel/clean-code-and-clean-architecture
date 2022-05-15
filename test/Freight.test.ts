import Decimal from "decimal.js";
import Sinon from "sinon";
import Freight from "../src/Freight";
import SpaceMeasure from "../src/SpaceMeasure";
import { SingleDimensionalSpace } from "../src/SpaceMeasureUnit";
import AddressMother from "./objectmothers/AddressMother";
import FreightableMother from "./objectmothers/FreightableMother";

test('Should be created when all parameters are valid', () => {
    const origin = AddressMother.createDouglasAddress();
    const destination = AddressMother.createRubensAddress();
    const item = FreightableMother.createTenCameras();
    expect(() => new Freight(origin, destination, [item])).not.toThrow();
});

test.only('Should be 99 when calculating price for 10 cameras 1000m away from each other', () => {
    const douglasAddress = Sinon.stub(AddressMother.createDouglasAddress())
    const rubensAddress = Sinon.stub(AddressMother.createRubensAddress());
    const tenCameras = FreightableMother.createTenCameras();
    const freight = new Freight(douglasAddress, rubensAddress, [tenCameras]);
    douglasAddress.calculateDistance.returns(new SpaceMeasure('1000', SingleDimensionalSpace.KM));
    rubensAddress.calculateDistance.returns(new SpaceMeasure('1000', SingleDimensionalSpace.KM));
    expect(freight.price).toStrictEqual(new Decimal('99.9'))
})