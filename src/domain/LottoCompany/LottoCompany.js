import {Lotto} from "../Lotto/Lotto";

export const LOTTO_PRICE = 1000;
export const LOTTO_AMOUNT = 5;

const LOTTO_SIZE = 6;
const LOTTO_NUMBER_MIN = 1;
const LOTTO_NUMBER_MAX = 45;

export class LottoCompany {
    #lottoPrice;
    #issuedLottoList = [];
    #sellerList = [];
    constructor(lottoPrice) {
        this.#lottoPrice = lottoPrice;
    }

    get lottoPrice() {
        return this.#lottoPrice;
    }

    get sellerList () {
        return this.#sellerList;
    }

    addSeller(lottoSeller) {
        this.#sellerList.push(lottoSeller);
    }

    issueLotto(lottoCustomer, lottoAmount) {
        const lottoList = this.#makeLottoList(lottoCustomer, lottoAmount);
        this.#storeIssuedLottoList(lottoList);
        return lottoList;
    }

    #makeLottoList(lottoCustomer, lottoAmount) {
        return Array.from({length: lottoAmount}, () => new Lotto(this, lottoCustomer, this.#makeLottoNumbers()));
    }

    #storeIssuedLottoList(lottoList) {
        this.#issuedLottoList = [...this.#issuedLottoList, ...lottoList];
    }

    #makeLottoNumbers() {
        const lottoNumbers = [];
        while (lottoNumbers.length < LOTTO_SIZE) {
            const lottoNumber = Math.floor(Math.random() * LOTTO_NUMBER_MAX) + LOTTO_NUMBER_MIN;
            if (!lottoNumbers.includes(lottoNumber)) {
                lottoNumbers.push(lottoNumber);
            }
        }
        return lottoNumbers;
    }
}