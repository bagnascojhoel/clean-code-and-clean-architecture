import Decimal from "decimal.js";
import Coupon from "../entity/Coupon";
import Freight from "../entity/Freight";
import Order from "../entity/order/Order";
import OrderItem from "../entity/order/OrderItem";
import WarehousePriceEntry from "../entity/warehouse/WarehousePriceEntry";

export default class OrderPriceCalculator {
    private readonly totalInItems: Decimal

    constructor(
        private readonly order: Order,
        private readonly priceEntries: WarehousePriceEntry[],
        private readonly freight: Freight,
        private readonly coupon?: Coupon
    ) {
        this.totalInItems = this.calculateTotalInItems(order.items, priceEntries)
    }

    public total(): Decimal {
        let result = this.freight.calculatePrice()
        const discountedItems = this.coupon?.calculateDiscountedPrice(this.order.createdAt, this.totalInItems)
        result = result.add(discountedItems ?? this.totalInItems)
        return result.toDecimalPlaces(2, Decimal.ROUND_UP)
    }

    private calculateTotalInItems(items: OrderItem[], priceEntries: WarehousePriceEntry[]): Decimal {
        const result = new Decimal(0)
        for (let item of items) {
            const effectivePriceEntry = this.priceEntries.find(e => e.warehouseItemId === item.warehouseItemId)
            if (!effectivePriceEntry || !effectivePriceEntry.isEffectiveAt(this.order.createdAt))
                throw `Could not get effective price for warehouse item ${item.warehouseItemId}`
            return result.add(effectivePriceEntry.newPrice.times(item.quantity))
        }
        return result
    }
}

/*
 public calculateTotalPrice(freight: Freight, coupon?: Coupon): Decimal {
        const itemsTotal = this.items.reduce<Decimal>((acc, item) => acc.plus(item.totalPrice), new Decimal(0))
        const couponDiscount = coupon?.calculateDiscount(this.createdAt, itemsTotal) ?? new Decimal(0)
        return itemsTotal
            .sub(couponDiscount)
            .plus(freight.calculatePrice());
    }
*/
