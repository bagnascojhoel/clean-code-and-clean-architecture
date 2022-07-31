import Decimal from "decimal.js"
import { DateTime } from "luxon"
import WarehousePriceEntry from "../../../src/domain/entity/warehouse/WarehousePriceEntry"

describe('Domain > Entity > WarehousePriceEntry', () => {
    it('Should create entry', () => {
        expect(() => WarehousePriceEntry.for(1234, new Decimal(456), DateTime.fromISO('2020-12-12'))).not.toThrow()
    })

    it('Should be true when date is after valid since', () => {
        const priceEntry = WarehousePriceEntry.for(1234, new Decimal(456), DateTime.fromISO('2020-12-12T12:40'))
        expect(priceEntry.isEffectiveAt(DateTime.fromISO('2020-12-12T12:41'))).toBeTruthy()
    })

    it('Should be false when date is equal to valid since', () => {
        const priceEntry = WarehousePriceEntry.for(1234, new Decimal(456), DateTime.fromISO('2020-12-12T12:40'))
        expect(priceEntry.isEffectiveAt(DateTime.fromISO('2020-12-12T12:40'))).toBeFalsy()
    })

    it('Should be false when date is before valid since', () => {
        const priceEntry = WarehousePriceEntry.for(1234, new Decimal(456), DateTime.fromISO('2020-12-12T12:40'))
        expect(priceEntry.isEffectiveAt(DateTime.fromISO('2020-12-12T12:39'))).toBeFalsy()
    })
})