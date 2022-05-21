import PhysicalAttributes from "../../src/domain/entity/PhysicalAttributes";
import SpaceMeasure from "../../src/domain/entity/SpaceMeasure";
import { SingleDimensionalSpace } from "../../src/domain/entity/SpaceMeasureUnit";
import WeightMeasure from "../../src/domain/entity/WeightMeasure";
import WeightMeasureUnit from "../../src/domain/entity/WeightMeasureUnit";


function createCamera(): PhysicalAttributes {
    return new PhysicalAttributes(
        new SpaceMeasure('20', SingleDimensionalSpace.CM),
        new SpaceMeasure('15', SingleDimensionalSpace.CM),
        new SpaceMeasure('10', SingleDimensionalSpace.CM),
        new WeightMeasure(1, WeightMeasureUnit.KG)
    );
}

export default { createCamera }