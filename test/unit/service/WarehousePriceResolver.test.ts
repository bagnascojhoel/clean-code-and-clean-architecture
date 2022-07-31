import Decimal from "decimal.js"
import WarehousePriceEntry from "../../../src/domain/entity/warehouse/WarehousePriceEntry"
import WarehousePriceResolver from "../../../src/domain/service/WarehousePriceResolver"
import DateTimeMother from "../../object-mother/DateTimeMother"
import WarehouseItemMother from "../../object-mother/WarehouseItemMother"
import WarehousePriceEntryMother from "../../object-mother/WarehousePriceEntryMother"

describe('Domain > Service > WarehousePriceResolver', () => {
    it('Should be the price that is closest before the given date time', () => {
        const cameraId = WarehouseItemMother.createCamera().id
        const expectedEntry = WarehousePriceEntryMother.createCameraPriceEntry2020()
        const entries = [
            expectedEntry,
            WarehousePriceEntry.for(cameraId, new Decimal(99), DateTimeMother.createDouglasBirthdayAt2022())
        ]

        const actualPrice = WarehousePriceResolver.resolvePrice(entries, cameraId, DateTimeMother.createDouglasBirthdayAt2022())

        expect(actualPrice).toBe(expectedEntry.newPrice)
    })

    it('Should throw when there are no entries for warehouse item', () => {
        const entries = [
            WarehousePriceEntry.for(999, new Decimal(99), DateTimeMother.createDouglasBirthdayAt2022())
        ]

        expect(() => WarehousePriceResolver.resolvePrice(entries, 1, DateTimeMother.createDouglasBirthdayAt2022()))
            .toThrow(`No entry could resolve price for 1`)
    })

    it('Should throw when there are no effective entries', () => {
        const cameraId = WarehouseItemMother.createCamera().id
        const entries = [
            WarehousePriceEntry.for(cameraId, new Decimal(99), DateTimeMother.createDouglasBirthdayAt2022())
        ]

        expect(() => WarehousePriceResolver.resolvePrice(entries, 1, DateTimeMother.createDouglasBirthdayAt2022()))
            .toThrow(`No entry could resolve price for 1`)
    })
})