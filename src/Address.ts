import SpaceMeasure from "./SpaceMeasure";
import { SingleDimensionalSpace } from "./SpaceMeasureUnit";

export default class Address {

    constructor() {

    }

    public calculateDistance(otherAddress: Address): SpaceMeasure {
        return new SpaceMeasure('1000', SingleDimensionalSpace.KM);
    }

}
