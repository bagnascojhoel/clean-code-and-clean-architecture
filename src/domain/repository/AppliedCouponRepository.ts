import AppliedCoupon from "../entity/AppliedCoupon";

export default interface AppliedCouponRepository {
    insert(appliedCoupon: AppliedCoupon): Promise<any>
}
