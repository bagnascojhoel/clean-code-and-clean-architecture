import AppliedCouponRepository from "../repository/AppliedCouponRepository";
import CouponRepository from "../repository/CouponRepository";
import OrderRepository from "../repository/OrderRepository";
import WarehouseItemRepository from "../repository/WarehouseItemRepository";

export default interface RepositoryFactory {
    createOrderRepository(): OrderRepository
    createAppliedCouponRepository(): AppliedCouponRepository
    createCouponRepository(): CouponRepository
    createWarehouseItemRepository(): WarehouseItemRepository
}
