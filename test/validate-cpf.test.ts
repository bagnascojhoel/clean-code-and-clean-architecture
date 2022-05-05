import { validateCpf } from '../src/validate-cpf'

describe('Invalid CPF scenarios', () => {
    test('Should be false when value is null', () => {
        let actual = validateCpf(null);
        expect(actual).toBe(false);
    })

    test('Should be false when value is undefined', () => {
        let actual = validateCpf(undefined);
        expect(actual).toBe(false);
    })

    test('Should be false when value is empty string', () => {
        let actual = validateCpf(undefined);
        expect(actual).toBe(false);
    })

    test('Should be false when value is smaller than 11', () => {
        const actual = validateCpf('1112223334');
        expect(actual).toBe(false);
    })

    test('Should be false when value is smaller greater than 14', () => {
        const actual = validateCpf('111.222.333.444');
        expect(actual).toBe(false);
    })

    test('Should be false when value is the same digit repeated', () => {
        const actual = validateCpf('11111111111');
        expect(actual).toBe(false);
    })

    test('Should be false when first verifier digit is wrong', () => {
        const actual = validateCpf('11144477789');
        expect(actual).toBe(false);
    })

    test('Should be false when second verifier digit is wrong', () => {
        const actual = validateCpf('11144477733');
        expect(actual).toBe(false);
    })
})

describe('Valid CPF scenarios', () => {
    test('Should be true when value is unmasked valid CPF', () => {
        const actual = validateCpf('80700816003');
        expect(actual).toBe(true);
    })

    test('Should be true when value is masked valid CPF', () => {
        const actual = validateCpf('715.130.640-70');
        expect(actual).toBe(true);
    })

    test('Should be false when verifier digits are right', () => {
        const actual = validateCpf('11144477735');
        expect(actual).toBe(true);
    })
})