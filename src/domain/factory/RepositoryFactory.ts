import AppliedCouponRepository from "../repository/AppliedCouponRepository";
import CouponRepository from "../repository/CouponRepository";
import OrderRepository from "../repository/OrderRepository";
import WarehouseItemRepository from "../repository/WarehouseItemRepository";
import WarehousePriceEntryRepository from "../repository/WarehousePriceEntryRepository";
import WarehouseStockEntryRepository from "../repository/WarehouseStockEntryRepository";

export default interface RepositoryFactory {
    createOrder(): OrderRepository
    createAppliedCoupon(): AppliedCouponRepository
    createCoupon(): CouponRepository
    createForWarehouseItem(): WarehouseItemRepository
    createForWarehousePriceEntry(): WarehousePriceEntryRepository
    createForWarehouseStockEntry(): WarehouseStockEntryRepository
}
