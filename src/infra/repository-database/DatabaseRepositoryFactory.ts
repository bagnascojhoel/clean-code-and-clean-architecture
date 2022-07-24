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
    constructor(private connection: DatabaseConnection) {

    }
    createOrderRepository(): OrderRepository {
        return new OrderRepositoryDatabase(this.connection)
    }
    createAppliedCouponRepository(): AppliedCouponRepository {
        return new AppliedCouponRepositoryDatabase(this.connection)
    }
    createCouponRepository(): CouponRepository {
        return new CouponRepositoryDatabase(this.connection)
    }
    createWarehouseItemRepository(): WarehouseItemRepository {
        return new WarehouseItemRepositoryDatabase(this.connection)
    }

}
