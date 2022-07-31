import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import AppliedCouponRepository from "../../domain/repository/AppliedCouponRepository";
import CouponRepository from "../../domain/repository/CouponRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import WarehouseItemRepository from "../../domain/repository/WarehouseItemRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import AppliedCouponRepositoryDatabase from "./AppliedCouponRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import WarehouseItemRepositoryDatabase from "./WarehouseItemRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
    private static orderRepository: OrderRepository
    private static appliedCouponRepository: AppliedCouponRepository
    private static couponRepository: CouponRepository
    private static warehouseItemRepository: WarehouseItemRepository

    constructor(private connection: DatabaseConnection) { }

    public createOrderRepository(): OrderRepository {
        if (!DatabaseRepositoryFactory.orderRepository)
            DatabaseRepositoryFactory.orderRepository = new OrderRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.orderRepository
    }

    public createAppliedCouponRepository(): AppliedCouponRepository {
        if (!DatabaseRepositoryFactory.appliedCouponRepository)
            DatabaseRepositoryFactory.appliedCouponRepository = new AppliedCouponRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.appliedCouponRepository
    }

    public createCouponRepository(): CouponRepository {
        if (!DatabaseRepositoryFactory.couponRepository)
            DatabaseRepositoryFactory.couponRepository = new CouponRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.couponRepository
    }

    public createWarehouseItemRepository(): WarehouseItemRepository {
        if (!DatabaseRepositoryFactory.warehouseItemRepository)
            DatabaseRepositoryFactory.warehouseItemRepository = new WarehouseItemRepositoryDatabase(this.connection)
        return DatabaseRepositoryFactory.warehouseItemRepository
    }
}
