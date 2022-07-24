import Decimal from "decimal.js"
import Address from "../../domain/entity/Address"
import Freight from "../../domain/entity/Freight"
import Freightable from "../../domain/entity/Freightable"
import WarehouseItem, { WarehouseItemId } from "../../domain/entity/WarehouseItem"
import RepositoryFactory from "../../domain/factory/RepositoryFactory"
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository"

const DEFAULT_MINIMUM_PRICE = new Decimal(10)
const ORIGIN = new Address()
const DESTINATION = new Address()
export default class SimulateFreightUseCase {
    private readonly warehouseRepository: WarehouseItemRepository

    constructor(private readonly repositoryFactory: RepositoryFactory) {
        this.warehouseRepository = repositoryFactory.createWarehouseItemRepository()
    }

    async execute(input: SimulateFreightInput): Promise<Decimal> {
        const warehouseItemIds = input.content.map(content => content.warehouseItemId)
        const warehouseItems = await this.warehouseRepository.findAll(warehouseItemIds)
        const freightables: Freightable[] = []
        input.content.forEach(inputItem => {
            const warehouseItem = warehouseItems.find(wi => wi.id === inputItem.warehouseItemId);
            if (warehouseItem)
                freightables.push(this.createFreigthable(warehouseItem, inputItem.quantity))
        })
        const freight = new Freight(DEFAULT_MINIMUM_PRICE, ORIGIN, DESTINATION, freightables)
        return freight.calculatePrice()
    }

    private createFreigthable(warehouseItem: WarehouseItem, quantity: Decimal): Freightable {
        return {
            quantity() {
                return quantity.toNumber()
            },
            unitaryPhysicalAttributes() {
                return warehouseItem.physicalAttributes
            }
        }
    }
}

export type SimulateFreightInput = {
    content: { warehouseItemId: WarehouseItemId, quantity: Decimal }[]
}
