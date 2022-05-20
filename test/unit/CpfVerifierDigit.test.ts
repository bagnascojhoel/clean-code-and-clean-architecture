import { CpfVerifierDigit } from "../../src/domain/entity/CpfVerifierDigit";

test('Should be true when CPF has invalid verifier digit', () => {
    const verifierDigit = new CpfVerifierDigit(10, 9);
    const actual = verifierDigit.isInvalidVerifierDigit('71513064010');
    expect(actual).toBe(true);
})

test('Should be true when method is invoked more than once', () => {
    const verifierDigit = new CpfVerifierDigit(10, 9);
    verifierDigit.isInvalidVerifierDigit('71513064010');
    const actual = verifierDigit.isInvalidVerifierDigit('71513064010');
    expect(actual).toBe(true);
})

test('Should be false when CPF has valid verifier digit', () => {
    const verifierDigit = new CpfVerifierDigit(10, 9);
    const actual = verifierDigit.isInvalidVerifierDigit('71513064070');
    expect(actual).toBe(false);
})