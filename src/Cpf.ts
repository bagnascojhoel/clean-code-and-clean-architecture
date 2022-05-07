const FIRST_VERIFIER_DIGIT_FACTOR = 10;
const SECOND_VERIFIER_DIGIT_FACTOR = 11;
const FIRST_VERIFIER_DIGIT_INDEX = 9;
const SECOND_VERIFIER_DIGIT_INDEX = 10;
export class Cpf {
    private _value: string;

    constructor(value: string | null | undefined) {
        if (!value) throw Error('There is no value');
        if (this.isInvalidCpf(value)) throw Error('CPF is invalid');
        this._value = this.leaveOnlyDigits(value);
    }

    public get value(): string {
        return this._value;
    }

    isInvalidCpf(value: string) {
        const cpfDigits = this.leaveOnlyDigits(value);
        if (this.isInvalidLength(cpfDigits)) return true;
        if (this.isOnlySameCharacter(cpfDigits)) return true;
        if (this.isInvalidVerifierDigit(cpfDigits, FIRST_VERIFIER_DIGIT_INDEX, FIRST_VERIFIER_DIGIT_FACTOR)) return true;
        return this.isInvalidVerifierDigit(cpfDigits, SECOND_VERIFIER_DIGIT_INDEX, SECOND_VERIFIER_DIGIT_FACTOR);
    }

    leaveOnlyDigits(aString: string): string {
        return aString.replaceAll(/[^0-9]/g, '');
    }

    isInvalidLength(aString: string): boolean {
        return aString.length !== 11;
    }

    isOnlySameCharacter(aString: string) {
        return aString.split("").every(character => character === aString[0])
    }

    isInvalidVerifierDigit(cpf: string, verifierDigitIndex: number, factor: number) {
        const secondVerifierDigit = this.calculateVerifierDigit(cpf, factor);
        return `${secondVerifierDigit}` !== cpf.at(verifierDigitIndex);
    }

    calculateVerifierDigit(cpf: string, factor: number) {
        let summation: number = 0;
        for (let i = 0; i < cpf.length && factor > 1; i++, factor--) {
            summation += parseInt(cpf[i]) * factor;
        }
        const remainder = summation % 11;
        return remainder < 2 ? 0 : 11 - remainder;

    }

}
