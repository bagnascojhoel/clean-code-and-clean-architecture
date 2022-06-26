import Decimal from "decimal.js";
import { DateTime } from "luxon";
import Coupon from "../../domain/entity/Coupon";
import CouponRepository from "../../domain/repository/CouponRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class CouponRepositoryDatabase implements CouponRepository {
    constructor(private connection: DatabaseConnection) {
        this.connection = connection
    }

    async insert(coupon: Coupon): Promise<any> {
        const insertStatement = `INSERT INTO coupon (name, discount_percentage, expires_at) VALUES (?, ?, ?)`
        const params = [coupon.name, coupon.discountPercentage.toString(), coupon.expirationDate.toUTC().toISO()]
        await this.connection.query(insertStatement, params)
    }

    async getOne(couponName: string): Promise<Coupon | undefined> {
        const statement = `SELECT name, discount_percentage discountPercentage, expires_at expiresAt FROM coupon WHERE name = ?`
        const [queryResult]: { name: string, discountPercentage: number, expiresAt: string }[] = await this.connection.query(statement, [couponName])

        return queryResult
            ? new Coupon(
                queryResult.name,
                new Decimal(queryResult.discountPercentage),
                DateTime.fromISO(queryResult.expiresAt))
            : undefined
    }
}
