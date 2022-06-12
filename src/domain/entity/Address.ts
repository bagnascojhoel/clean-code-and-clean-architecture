import { Distance } from "./MeasureUnit";
import SpaceMeasure from "./SpaceMeasure";

export default class Address {

    constructor() {

    }

    public calculateDistance(otherAddress: Address): SpaceMeasure {
        return new SpaceMeasure('1000', Distance.KM);
    }

}
