import { Distance, Weight } from "../../src/domain/entity/MeasureUnit";
import PhysicalAttributes from "../../src/domain/entity/PhysicalAttributes";
import SpaceMeasure from "../../src/domain/entity/SpaceMeasure";
import WeightMeasure from "../../src/domain/entity/WeightMeasure";


function createCamera(): PhysicalAttributes {
    return new PhysicalAttributes(
        new SpaceMeasure('0.20', Distance.M),
        new SpaceMeasure('0.15', Distance.M),
        new SpaceMeasure('0.10', Distance.M),
        new WeightMeasure(1, Weight.KG)
    );
}

export default { createCamera }