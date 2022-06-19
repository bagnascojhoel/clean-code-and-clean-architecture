import Coupon from "../entity/Coupon";

export default interface CouponRepository {
    getOne(couponName: string): Promise<Coupon>;
    insert(coupon: Coupon): Promise<any>;
}
