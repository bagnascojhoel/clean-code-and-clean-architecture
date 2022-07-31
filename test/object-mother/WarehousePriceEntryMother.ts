import Decimal from "decimal.js";
import { DateTime } from "luxon";
import WarehousePriceEntry from "../../src/domain/entity/warehouse/WarehousePriceEntry";
import WarehouseItemMother from "./WarehouseItemMother";

function createCameraPriceEntry2020(): WarehousePriceEntry {
    return WarehousePriceEntry.for(
        WarehouseItemMother.createCamera().id,
        new Decimal('100.999'),
        DateTime.fromISO('2020-10-01')
    )
}

export default {
    createCameraPriceEntry2020,
}