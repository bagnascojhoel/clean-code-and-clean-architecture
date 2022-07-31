import Decimal from "decimal.js";
import { DateTime } from "luxon";
import WarehousePriceEntry from "../../../src/domain/entity/warehouse/WarehousePriceEntry";
import OrderPriceCalculator from "../../../src/domain/service/OrderPriceCalculator";
import CouponMother from "../../object-mother/CouponMother";
import DateTimeMother from "../../object-mother/DateTimeMother";
import FreightMother from "../../object-mother/FreightMother";
import OrderMother from "../../object-mother/OrderMother";
import WarehousePriceEntryMother from "../../object-mother/WarehousePriceEntryMother";

describe('Domain > Service > OrderPriceCalculator', () => {
    it('Should calculate total price for rubens order', () => {
        const order = OrderMother.createRubensOrder()
        const priceEntries = [WarehousePriceEntryMother.createCameraPriceEntry2020()]
        const freight = FreightMother.createTenCamerasFromDouglasToRubens()
        const calculator = new OrderPriceCalculator(order, priceEntries, freight);
        expect(calculator.total()).toStrictEqual(new Decimal(1109.89))
    })

    it('Should throw when effective price of an item is not available', () => {
        const order = OrderMother.createRubensOrder()
        const priceEntries = [WarehousePriceEntry.for(999, new Decimal(55), DateTimeMother.createDouglasBirthdayAt2022())]
        const freight = FreightMother.createTenCamerasFromDouglasToRubens()
        expect(() => new OrderPriceCalculator(order, priceEntries, freight)).toThrow('Could not get effective price for warehouse item 1')
    })

    it('Should throw when effective price of item is newer than order', () => {
        const order = OrderMother.createRubensOrder()
        const priceEntries = [WarehousePriceEntry.for(1, new Decimal(55), DateTime.fromISO('2022-02-01T06:00'))]
        const freight = FreightMother.createTenCamerasFromDouglasToRubens()
        expect(() => new OrderPriceCalculator(order, priceEntries, freight)).toThrow('Could not get effective price for warehouse item 1')
    })

    it('Should be 1008.90 when calculating order price with coupon', () => {
        const order = OrderMother.createRubensOrder()
        const priceEntries = [WarehousePriceEntryMother.createCameraPriceEntry2020()]
        const freight = FreightMother.createTenCamerasFromDouglasToRubens()
        const coupon = CouponMother.create10OffUntilJanuary2023()
        const calculator = new OrderPriceCalculator(order, priceEntries, freight, coupon);
        expect(calculator.total()).toStrictEqual(new Decimal(1008.90))
    })
})