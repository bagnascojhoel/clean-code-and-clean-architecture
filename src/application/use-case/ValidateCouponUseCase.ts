import { DateTime } from "luxon";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";

export default class ValidateCouponUseCase {
    private readonly couponRepository: CouponRepository

    constructor(private readonly repositoryFactory: RepositoryFactory) {
        this.couponRepository = repositoryFactory.createCoupon()
    }

    public async execute(couponName: string): Promise<boolean> {
        const couponFound = await this.couponRepository.getOne(couponName)
        if (!couponFound) return false;
        return !couponFound.hasExpired(DateTime.now());
    }
}
