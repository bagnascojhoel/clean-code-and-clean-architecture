export class CpfVerifierDigit {
    private _factor: number;
    private _indexOnCpf: number;

    constructor(factor: number, indexOnCpf: number) {
        this._factor = factor;
        this._indexOnCpf = indexOnCpf;
    }

    public isInvalidVerifierDigit(cpf: string) {
        const secondVerifierDigit = this._calculateForCpf(cpf, this._factor);
        return `${secondVerifierDigit}` !== cpf.at(this._indexOnCpf);
    }

    private _calculateForCpf(cpf: string, factor: number) {
        let summation: number = 0;
        for (let i = 0; i < cpf.length && factor > 1; i++, factor--) {
            summation += parseInt(cpf[i]) * factor;
        }
        const remainder = summation % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

}
