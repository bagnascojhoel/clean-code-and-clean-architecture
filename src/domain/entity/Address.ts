import { Distance } from "./physical-attributes/MeasureUnit";
import SpaceMeasure from "./physical-attributes/SpaceMeasure";

export default class Address {

    constructor() {

    }

    public calculateDistance(otherAddress: Address): SpaceMeasure {
        return new SpaceMeasure('1000', Distance.KM);
    }

}
