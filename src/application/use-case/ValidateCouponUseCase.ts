import { DateTime } from "luxon";
import CouponRepository from "../../domain/repository/CouponRepository";

export default class ValidateCouponUseCase {
    constructor(private couponRepository: CouponRepository) { }

    public async execute(couponName: string): Promise<boolean> {
        const couponFound = await this.couponRepository.getOne(couponName)
        if (!couponFound) return false;
        return !couponFound.hasExpired(DateTime.now());
    }
}
