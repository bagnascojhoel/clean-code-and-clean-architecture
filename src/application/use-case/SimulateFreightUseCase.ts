import Decimal from "decimal.js"
import Address from "../../domain/entity/Address"
import Freight from "../../domain/entity/Freight"
import FreightableItem from "../../domain/entity/FreightableItem"
import { WarehouseItemId } from "../../domain/entity/warehouse/WarehouseItem"
import RepositoryFactory from "../../domain/factory/RepositoryFactory"
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository"

const DEFAULT_MINIMUM_PRICE = new Decimal(10)
const ORIGIN = new Address()
const DESTINATION = new Address()
export default class SimulateFreightUseCase {
    private readonly warehouseRepository: WarehouseItemRepository

    constructor(private readonly repositoryFactory: RepositoryFactory) {
        this.warehouseRepository = repositoryFactory.createForWarehouseItem()
    }

    async execute(input: SimulateFreightInput): Promise<Decimal> {
        const warehouseItemIds = input.content.map(content => content.warehouseItemId)
        const warehouseItems = await this.warehouseRepository.findAll(warehouseItemIds)
        const freightables: FreightableItem[] = []
        input.content.forEach(inputItem => {
            const warehouseItem = warehouseItems.find(wi => wi.id === inputItem.warehouseItemId);
            if (warehouseItem)
                freightables.push(new FreightableItem(warehouseItem.physicalAttributes, inputItem.quantity))
        })
        const freight = new Freight(DEFAULT_MINIMUM_PRICE, ORIGIN, DESTINATION, freightables)
        return freight.calculatePrice()
    }
}

export type SimulateFreightInput = {
    content: { warehouseItemId: WarehouseItemId, quantity: number }[]
}
