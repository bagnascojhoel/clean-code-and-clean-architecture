import Cpf from "../../../src/domain/entity/Cpf";

describe('Invalid CPF scenarios', () => {
    test('Should throw error when value is null', () => {
        expect(() => new Cpf(null)).toThrow(new Error("There is no value"));
    })

    test('Should throw error when value is undefined', () => {
        expect(() => new Cpf(undefined)).toThrow(new Error("There is no value"));
    })

    test('Should throw error when value is empty string', () => {
        expect(() => new Cpf('')).toThrow(new Error("There is no value"));
    })

    test('Should throw error when value is smaller than 11', () => {
        expect(() => new Cpf('1112223334')).toThrow(new Error("CPF is invalid"));
    })

    test('Should throw error when value is smaller greater than 14', () => {
        expect(() => new Cpf('111.222.333.444')).toThrow(new Error("CPF is invalid"));
    })

    test('Should throw error when value is the same digit repeated', () => {
        expect(() => new Cpf('11111111111')).toThrow(new Error("CPF is invalid"));
    })

    test('Should throw error when first verifier digit is wrong', () => {
        expect(() => new Cpf('11144477789')).toThrow(new Error("CPF is invalid"));
    })

    test('Should throw error when second verifier digit is wrong', () => {
        expect(() => new Cpf('11144477733')).toThrow(new Error("CPF is invalid"));
    })
})

describe('Valid CPF scenarios', () => {
    test('Should be equal when value is unmasked valid CPF', () => {
        const actual = new Cpf('80700816003');
        expect(actual.value).toBe('80700816003');
    })

    test('Should be equal to unmasked value when value is masked valid CPF', () => {
        const actual = new Cpf('715.130.640-70');
        expect(actual.value).toBe('71513064070');
    })

    test('Should be equal when verifier digits are right', () => {
        const actual = new Cpf('11144477735');
        expect(actual.value).toBe('11144477735');
    })
})