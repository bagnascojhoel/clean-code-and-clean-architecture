import Decimal from "decimal.js"
import { DateTime } from "luxon"
import { WarehouseItemId } from "../../domain/entity/warehouse/WarehouseItem"
import WarehousePriceEntry from "../../domain/entity/warehouse/WarehousePriceEntry"
import RepositoryFactory from "../../domain/factory/RepositoryFactory"
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository"
import WarehousePriceEntryRepository from "../../domain/repository/WarehousePriceEntryRepository"

export default class ChangeWarehouseItemPriceUseCase {
    private readonly warehousePriceEntryRepository: WarehousePriceEntryRepository
    private readonly warehouseItemRepository: WarehouseItemRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.warehousePriceEntryRepository = repositoryFactory.createForWarehousePriceEntry()
        this.warehouseItemRepository = repositoryFactory.createForWarehouseItem()
    }

    public async execute(input: Input): Promise<void> {
        const itemExists = await this.warehouseItemRepository.exists([input.warehouseItemId])
        if (!itemExists) throw `Warehouse item was not found`
        const entry = WarehousePriceEntry.for(input.warehouseItemId, input.newPrice, input.effectiveSince)
        await this.warehousePriceEntryRepository.create(entry)
    }
}

export type Input = {
    warehouseItemId: WarehouseItemId,
    newPrice: Decimal,
    effectiveSince: DateTime
}
