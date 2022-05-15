import Decimal from "decimal.js";
import Address from "./Address";
import Freightable from "./Freightable";

const DENSITY_FACTOR = 100;

export default class Freight {
    private items: Freightable[];

    constructor(
        readonly origin: Address,
        readonly destination: Address,
        items: Freightable[]
    ) {
        this.origin = origin;
        this.destination = destination;
        this.items = items;
    }

    get price(): Decimal {
        const totalOnItems: Decimal = this.items.reduce<Decimal>((acc, item) => {
            const metricVolume = item.unitaryPhysicalAttributes().metricVolume.value;
            const kilogramMetricDensity = item.unitaryPhysicalAttributes().kilogramMetricDensity;
            const singleItemPricing = metricVolume.times(kilogramMetricDensity).div(DENSITY_FACTOR);
            return acc.plus(singleItemPricing.times(item.quantity()));
        }, new Decimal(0));
        const distance = this.origin.calculateDistance(this.destination);
        return totalOnItems.times(distance.value);
    }

}
