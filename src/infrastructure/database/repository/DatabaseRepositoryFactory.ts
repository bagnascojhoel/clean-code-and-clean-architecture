import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AppliedCouponRepository from "../../../domain/repository/AppliedCouponRepository";
import CouponRepository from "../../../domain/repository/CouponRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import WarehouseItemRepository from "../../../domain/repository/WarehouseItemRepository";
import WarehousePriceEntryRepository from "../../../domain/repository/WarehousePriceEntryRepository";
import WarehouseStockEntryRepository from "../../../domain/repository/WarehouseStockEntryRepository";
import DatabaseConnection from "../DatabaseConnection";
import AppliedCouponRepositoryDatabase from "./AppliedCouponRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import WarehouseItemRepositoryDatabase from "./WarehouseItemRepositoryDatabase";
import WarehousePriceEntryRepositoryDatabase from "./WarehousePriceEntryRepositoryDatabase";
import WarehouseStockEntryRepositoryDatabase from "./WarehouseStockEntryRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
    private static orderRepository: OrderRepository
    private static appliedCouponRepository: AppliedCouponRepository
    private static couponRepository: CouponRepository
    private static warehouseItemRepository: WarehouseItemRepository
    private static warehousePriceEntryRepository: WarehousePriceEntryRepository
    private static warehouseStockEntryRepository: WarehouseStockEntryRepository

    constructor(private connection: DatabaseConnection) { }

    createForOrder(): OrderRepository {
        if (!DatabaseRepositoryFactory.orderRepository)
            DatabaseRepositoryFactory.orderRepository = new OrderRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.orderRepository
    }

    createAppliedCoupon(): AppliedCouponRepository {
        if (!DatabaseRepositoryFactory.appliedCouponRepository)
            DatabaseRepositoryFactory.appliedCouponRepository = new AppliedCouponRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.appliedCouponRepository
    }

    createCoupon(): CouponRepository {
        if (!DatabaseRepositoryFactory.couponRepository)
            DatabaseRepositoryFactory.couponRepository = new CouponRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.couponRepository
    }

    createForWarehouseItem(): WarehouseItemRepository {
        if (!DatabaseRepositoryFactory.warehouseItemRepository)
            DatabaseRepositoryFactory.warehouseItemRepository = new WarehouseItemRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.warehouseItemRepository
    }

    createForWarehousePriceEntry(): WarehousePriceEntryRepository {
        if (!DatabaseRepositoryFactory.warehousePriceEntryRepository)
            DatabaseRepositoryFactory.warehousePriceEntryRepository = new WarehousePriceEntryRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.warehousePriceEntryRepository
    }

    createForWarehouseStockEntry(): WarehouseStockEntryRepository {
        if (!DatabaseRepositoryFactory.warehouseStockEntryRepository)
            DatabaseRepositoryFactory.warehouseStockEntryRepository = new WarehouseStockEntryRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.warehouseStockEntryRepository
    }
}
