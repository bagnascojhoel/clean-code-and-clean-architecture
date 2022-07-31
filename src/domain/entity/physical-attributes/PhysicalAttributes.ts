import Decimal from "decimal.js";
import { Distance, Volume, Weight } from "./MeasureUnit";
import SpaceMeasure from "./SpaceMeasure";
import WeightMeasure from "./WeightMeasure";

export default class PhysicalAttributes {

    constructor(
        readonly widthX: SpaceMeasure,
        readonly lengthY: SpaceMeasure,
        readonly heightZ: SpaceMeasure,
        readonly weight: WeightMeasure
    ) {
        if (this.usingSameUnit(widthX, lengthY, heightZ)) throw Error('Physical attributes\'s space measures must all use same unit');
        this.widthX = widthX;
        this.heightZ = heightZ;
        this.lengthY = lengthY;
        this.weight = weight;
    }

    public get kilogramMetricDensity(): Decimal {
        const volume = this.metricVolume.value;
        const weight = this.weight.as(Weight.KG);
        return new Decimal(weight.value.div(volume).toPrecision(3));
    }

    public get metricVolume(): SpaceMeasure {
        const volume = this.widthX.as(Distance.M).value
            .times(this.lengthY.as(Distance.M).value)
            .times(this.heightZ.as(Distance.M).value);
        return new SpaceMeasure(volume, Volume.M3);
    }


    private usingSameUnit(...spaceMeasures: SpaceMeasure[]): boolean {
        const firstUnit = spaceMeasures[0].unit;
        return spaceMeasures.some(sm => sm.unit !== firstUnit);
    }

}
