import { functionsIn } from "lodash";
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

function createFridge(): PhysicalAttributes {
    return new PhysicalAttributes(
        new SpaceMeasure('0.5', Distance.M),
        new SpaceMeasure('0.5', Distance.M),
        new SpaceMeasure('1.8', Distance.M),
        new WeightMeasure('50', Weight.KG)
    );
}

export default { createCamera, createFridge }