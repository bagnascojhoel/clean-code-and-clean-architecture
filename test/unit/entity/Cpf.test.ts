import Cpf from "../../../src/domain/entity/Cpf";

describe('Invalid CPF scenarios', () => {
    test('Should throw error when value is null', () => {
        expect(() => Cpf.of(null)).toThrow(new Error("There is no value"));
    })

    test('Should throw error when value is undefined', () => {
        expect(() => Cpf.of(undefined)).toThrow(new Error("There is no value"));
    })

    test('Should throw error when value is empty string', () => {
        expect(() => Cpf.of('')).toThrow(new Error("There is no value"));
    })

    test('Should throw error when value is smaller than 11', () => {
        expect(() => Cpf.of('1112223334')).toThrow(new Error("CPF is invalid"));
    })

    test('Should throw error when value is smaller greater than 14', () => {
        expect(() => Cpf.of('111.222.333.444')).toThrow(new Error("CPF is invalid"));
    })

    test('Should throw error when value is the same digit repeated', () => {
        expect(() => Cpf.of('11111111111')).toThrow(new Error("CPF is invalid"));
    })

    test('Should throw error when first verifier digit is wrong', () => {
        expect(() => Cpf.of('11144477789')).toThrow(new Error("CPF is invalid"));
    })

    test('Should throw error when second verifier digit is wrong', () => {
        expect(() => Cpf.of('11144477733')).toThrow(new Error("CPF is invalid"));
    })
})

describe('Valid CPF scenarios', () => {
    test('Should be equal when value is an Cpf instance', () => {
        const actual = Cpf.of(Cpf.of('80700816003'));
        expect(actual.value).toBe('80700816003');
    })

    test('Should be equal when value is unmasked valid CPF', () => {
        const actual = Cpf.of('80700816003');
        expect(actual.value).toBe('80700816003');
    })

    test('Should be equal to unmasked value when value is masked valid CPF', () => {
        const actual = Cpf.of('715.130.640-70');
        expect(actual.value).toBe('71513064070');
    })

    test('Should be equal when verifier digits are right', () => {
        const actual = Cpf.of('11144477735');
        expect(actual.value).toBe('11144477735');
    })
})