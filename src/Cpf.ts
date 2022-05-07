import { CpfVerifierDigit } from "./CpfVerifierDigit";

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
        const firstVerifierDigit = new CpfVerifierDigit(10, 9);
        if (firstVerifierDigit.isInvalidVerifierDigit(cpfDigits)) return true;
        const secondVerifierDigit = new CpfVerifierDigit(11, 10);
        return secondVerifierDigit.isInvalidVerifierDigit(cpfDigits);
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

}
