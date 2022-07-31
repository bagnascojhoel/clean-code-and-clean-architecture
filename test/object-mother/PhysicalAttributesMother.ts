import { Distance, Weight } from "../../src/domain/entity/physical-attributes/MeasureUnit";
import PhysicalAttributes from "../../src/domain/entity/physical-attributes/PhysicalAttributes";
import SpaceMeasure from "../../src/domain/entity/physical-attributes/SpaceMeasure";
import WeightMeasure from "../../src/domain/entity/physical-attributes/WeightMeasure";

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