import {Lotto} from "../Lotto/Lotto";

export const LOTTO_PRICE = 1000;
export const LOTTO_AMOUNT = 5;

export class LottoCompany {
    #lottoPrice;
    constructor(lottoPrice) {
        this.#lottoPrice = lottoPrice;
    }

    get lottoPrice() {
        return this.#lottoPrice;
    }

    issueLotto(lottoCustomer, lottoAmount) {
        return Array.from({length: lottoAmount}, () => new Lotto(this, lottoCustomer, this.#makeLottoNumbers()));
    }

    #makeLottoNumbers() {
        const lottoNumbers = [];
        while (lottoNumbers.length < 6) {
            const lottoNumber = Math.floor(Math.random() * 45) + 1;
            if (!lottoNumbers.includes(lottoNumber)) {
                lottoNumbers.push(lottoNumber);
            }
        }
        return lottoNumbers;
    }
}