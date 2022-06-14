import Coupon from "../../domain/entity/Coupon";
import CouponRepository from "../../domain/repository/CouponRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class CouponRepositoryDatabase implements CouponRepository {

    constructor(private connection: DatabaseConnection) {
        this.connection = connection;
    }

    save(coupon: Coupon): Promise<any> {
        throw new Error("Method not implemented.");
    }

}
