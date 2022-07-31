import AppliedCouponRepository from "../repository/AppliedCouponRepository";
import CouponRepository from "../repository/CouponRepository";
import OrderRepository from "../repository/OrderRepository";
import WarehouseItemRepository from "../repository/WarehouseItemRepository";
import WarehousePriceEntryRepository from "../repository/WarehousePriceEntryRepository";

export default interface RepositoryFactory {
    createOrder(): OrderRepository
    createAppliedCoupon(): AppliedCouponRepository
    createCoupon(): CouponRepository
    createForWarehouseItem(): WarehouseItemRepository
    createForWarehousePriceEntry(): WarehousePriceEntryRepository
}
