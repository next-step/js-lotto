const LOTTO_MAX_NUMBER = 45;

export class LottoNumber {
    constructor() {}

    getLottoNumbers(amount) {
        return Array.from({ length: amount }, (v) => this.#getLottoNumber());
    }

    #getLottoNumber() {
        let lottoNumbers = Array.from({ length: LOTTO_MAX_NUMBER }, (v, i) => ++i);

        this.#shuffle(lottoNumbers);

        return lottoNumbers.splice(0, 6).sort((a, b) => a - b);
    }

    #shuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }
}
