import PhysicalAttributes from "../../src/PhysicalAttributes";
import SpaceMeasure from "../../src/SpaceMeasure";
import { SingleDimensionalSpace } from "../../src/SpaceMeasureUnit";
import WeightMeasure from "../../src/WeightMeasure";
import { WeightMeasureUnit } from "../../src/WeightMeasureUnit";

function createHandCube(): PhysicalAttributes {
    return new PhysicalAttributes(
        new SpaceMeasure('3', SingleDimensionalSpace.CM),
        new SpaceMeasure('3', SingleDimensionalSpace.CM),
        new SpaceMeasure('3', SingleDimensionalSpace.CM),
        new WeightMeasure(500, WeightMeasureUnit.G)
    );
}

export default { createHandCube }