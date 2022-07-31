import AppliedCoupon from "../../../domain/entity/AppliedCoupon";
import AppliedCouponRepository from "../../../domain/repository/AppliedCouponRepository";
import DatabaseConnection from "../DatabaseConnection";

export default class AppliedCouponRepositoryDatabase implements AppliedCouponRepository {
    constructor(private connection: DatabaseConnection) {
        this.connection = connection;
    }

    async insert(appliedCoupon: AppliedCoupon): Promise<any> {
        const [queryResult]: { couponId: number }[] = await this.connection.query(`SELECT coupon_id couponId FROM coupon c WHERE c.name = ?`, appliedCoupon.coupon.name)
        if (!queryResult) throw 'Cannot apply non existing coupon'
        const insertStatement = `INSERT INTO applied_coupon (coupon_id, order_code) VALUES (?, ?)`
        await this.connection.query(insertStatement, [queryResult.couponId, appliedCoupon.order.code.value])
    }
}
