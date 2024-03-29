import Decimal from "decimal.js";
import Address from "./Address";
import FreightableItem from "./FreightableItem";

const DENSITY_FACTOR = 100;

export default class Freight {
    private items: FreightableItem[];

    constructor(
        readonly minimumPrice: Decimal,
        readonly origin: Address,
        readonly destination: Address,
        items: FreightableItem[]
    ) {
        this.minimumPrice = minimumPrice
        this.origin = origin;
        this.destination = destination;
        this.items = items;
    }

    calculatePrice(): Decimal {
        const totalOnItems: Decimal = this.items.reduce<Decimal>((acc, item) => {
            const metricVolume = item.physicalAttributes.metricVolume.value;
            const kilogramMetricDensity = item.physicalAttributes.kilogramMetricDensity;
            const singleItemPricing = metricVolume.times(kilogramMetricDensity).div(DENSITY_FACTOR);
            return acc.plus(singleItemPricing.times(item.quantity));
        }, new Decimal(0));
        const distance = this.origin.calculateDistance(this.destination);
        const calculatedPrice = totalOnItems.times(distance.value);
        return calculatedPrice.greaterThan(this.minimumPrice) ? calculatedPrice : this.minimumPrice;
    }

}
