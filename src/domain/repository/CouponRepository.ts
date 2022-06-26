import Coupon from "../entity/Coupon";

export default interface CouponRepository {
    getOne(couponName: string): Promise<Coupon | undefined>;
    insert(coupon: Coupon): Promise<any>;
}
