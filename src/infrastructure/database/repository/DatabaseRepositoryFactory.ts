import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AppliedCouponRepository from "../../../domain/repository/AppliedCouponRepository";
import CouponRepository from "../../../domain/repository/CouponRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import WarehouseItemRepository from "../../../domain/repository/WarehouseItemRepository";
import WarehousePriceEntryRepository from "../../../domain/repository/WarehousePriceEntryRepository";
import DatabaseConnection from "../DatabaseConnection";
import AppliedCouponRepositoryDatabase from "./AppliedCouponRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import WarehouseItemRepositoryDatabase from "./WarehouseItemRepositoryDatabase";
import WarehousePriceEntryRepositoryDatabase from "./WarehousePriceEntryRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
    private static orderRepository: OrderRepository
    private static appliedCouponRepository: AppliedCouponRepository
    private static couponRepository: CouponRepository
    private static warehouseItemRepository: WarehouseItemRepository
    private static warehousePriceEntryRepository: WarehousePriceEntryRepository

    constructor(private connection: DatabaseConnection) { }

    public createOrder(): OrderRepository {
        if (!DatabaseRepositoryFactory.orderRepository)
            DatabaseRepositoryFactory.orderRepository = new OrderRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.orderRepository
    }

    public createAppliedCoupon(): AppliedCouponRepository {
        if (!DatabaseRepositoryFactory.appliedCouponRepository)
            DatabaseRepositoryFactory.appliedCouponRepository = new AppliedCouponRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.appliedCouponRepository
    }

    public createCoupon(): CouponRepository {
        if (!DatabaseRepositoryFactory.couponRepository)
            DatabaseRepositoryFactory.couponRepository = new CouponRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.couponRepository
    }

    public createForWarehouseItem(): WarehouseItemRepository {
        if (!DatabaseRepositoryFactory.warehouseItemRepository)
            DatabaseRepositoryFactory.warehouseItemRepository = new WarehouseItemRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.warehouseItemRepository
    }

    createForWarehousePriceEntry(): WarehousePriceEntryRepository {
        if (!DatabaseRepositoryFactory.warehousePriceEntryRepository)
            DatabaseRepositoryFactory.warehousePriceEntryRepository = new WarehousePriceEntryRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.warehousePriceEntryRepository
    }
}
