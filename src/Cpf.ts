export class Cpf {
    private _value: string;

    constructor(value: any) {
        if (!this.isValidValue(value)) throw Error('CPF is invalid');
        this._value = this.leaveOnlyDigits(value);
    }

    public get value(): string {
        return this._value;
    }

    isValidValue(value: string) {
        if (!value) return false;
        const aString = this.leaveOnlyDigits(value);
        if (!this.hasCpfLength(aString) || this.isSameCharacter(aString)) return false;
        const firstVerifierDigit = this.calculateFirstVerifierDigit(aString);
        const secondVerifierDigit = this.calculateSecondVerifierDigit(aString, firstVerifierDigit);
        return parseInt(aString[9]) == firstVerifierDigit && parseInt(aString[10]) == secondVerifierDigit;
    }

    leaveOnlyDigits(aString: string): string {
        return aString.replaceAll(/[^0-9]/g, '');
    }

    hasCpfLength(aString: string): boolean {
        return aString.length === 11;
    }

    isSameCharacter(aString: string) {
        return aString.split("").every(character => character === aString[0])
    }

    calculateFirstVerifierDigit(value: string): number {
        const summationUntilNinthDigit = this.calcCpfSummationUntilNinthDigit(value);
        const remainder = summationUntilNinthDigit % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }


    calcCpfSummationUntilNinthDigit(aString: string): number {
        let result: number = 0;
        for (let i = 0; i <= 8; i++)
            result += parseInt(aString[i]) * (10 - i);
        return result;
    }

    calculateSecondVerifierDigit(
        baseString: string,
        firstVerifierDigit: number
    ): number {
        const digits = baseString.split('');
        digits[9] = firstVerifierDigit.toString();
        const summationUntilTenthDigit = this.calcCpfSummationUntilTenthDigit(digits);
        const remainder = summationUntilTenthDigit % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

    calcCpfSummationUntilTenthDigit(digits: string[]): number {
        let result: number = 0;
        for (let i = 0; i <= 9; i++)
            result += parseInt(digits[i]) * (11 - i);
        return result;
    }

}
