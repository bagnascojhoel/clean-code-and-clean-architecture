import Coupon from "../entity/Coupon";

export default interface CouponRepository {
    save(coupon: Coupon): Promise<any>
}
