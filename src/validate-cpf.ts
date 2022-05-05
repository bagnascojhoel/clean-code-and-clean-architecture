function hasCpfLength(aString: string): boolean {
    return aString.length === 11;
}

function isSameCharacter(aString: string) {
    return aString.split("").every(character => character === aString[0])
}

function leaveOnlyDigits(aString: string): string {
    return aString.replaceAll(/[^0-9]/g, '');
}

function calcCpfSummationUntilNinthDigit(aString: string): number {
    let result: number = 0;
    for (let i = 0; i <= 8; i++)
        result += parseInt(aString[i]) * (10 - i);
    return result;
}

function calculateFirstVerifierDigit(value: string): number {
    const summationUntilNinthDigit = calcCpfSummationUntilNinthDigit(value);
    const remainder = summationUntilNinthDigit % 11;
    return remainder < 2 ? 0 : 11 - remainder;
}

function calcCpfSummationUntilTenthDigit(digits: string[]): number {
    let result: number = 0;
    for (let i = 0; i <= 9; i++)
        result += parseInt(digits[i]) * (11 - i);
    return result;
}

function calculateSecondVerifierDigit(
    baseString: string,
    firstVerifierDigit: number
): number {
    const digits = baseString.split('');
    digits[9] = firstVerifierDigit.toString();
    const summationUntilTenthDigit = calcCpfSummationUntilTenthDigit(digits);
    const remainder = summationUntilTenthDigit % 11;
    return remainder < 2 ? 0 : 11 - remainder;
}

export function validateCpf(value: any): boolean {
    if (!value) return false;
    const aString = leaveOnlyDigits(value);
    if (!hasCpfLength(aString) || isSameCharacter(aString)) return false;
    const firstVerifierDigit = calculateFirstVerifierDigit(aString);
    const secondVerifierDigit = calculateSecondVerifierDigit(aString, firstVerifierDigit);
    return parseInt(aString[9]) == firstVerifierDigit && parseInt(aString[10]) == secondVerifierDigit;
}
