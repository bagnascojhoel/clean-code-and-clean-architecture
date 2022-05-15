import PhysicalAttributes from "../../src/PhysicalAttributes";
import SpaceMeasure from "../../src/SpaceMeasure";
import { SingleDimensionalSpace } from "../../src/SpaceMeasureUnit";
import WeightMeasure from "../../src/WeightMeasure";
import { WeightMeasureUnit } from "../../src/WeightMeasureUnit";

function createCamera(): PhysicalAttributes {
    return new PhysicalAttributes(
        new SpaceMeasure('20', SingleDimensionalSpace.CM),
        new SpaceMeasure('15', SingleDimensionalSpace.CM),
        new SpaceMeasure('10', SingleDimensionalSpace.CM),
        new WeightMeasure(1, WeightMeasureUnit.KG)
    );
}

export default { createCamera }