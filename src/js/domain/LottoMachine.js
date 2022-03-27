import { LottoNumber } from "./LottoNumber.js"

const LOTTO_LENGTH = 6;

export class LottoMachine {
    lottoNumber = null;

    constructor() {
        this.lottoNumber = new LottoNumber();
    }

    getLottoNumbers(amount) {
        return Array.from({length: amount}, () => {
            return this.lottoNumber.getLottoNumber()
            .sort(() => Math.random() - 0.5)
            .splice(0, LOTTO_LENGTH)
            .sort((a, b) => {return a - b});
        });
    }
}