import {Lotto} from "../Lotto/Lotto";

export const LOTTO_PRICE = 1000;
export const LOTTO_AMOUNT = 5;

const LOTTO_SIZE = 6;
const LOTTO_NUMBER_MIN = 1;
const LOTTO_NUMBER_MAX = 45;

export const DEFAULT_LOTTO_PRIZE = {
    1 : 2_000_000_000,
    2 : 30_000_000,
    3 : 1_500_000,
    4 : 50_000,
    5 : 5_000,
}

export class LottoCompany {
    #LOTTO_PRIZE = DEFAULT_LOTTO_PRIZE;
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

    get issuedLottoList() {
        return this.#issuedLottoList;
    }

    addSeller(lottoSeller) {
        this.#sellerList.push(lottoSeller);
    }

    makeLottoList(lottoCustomer, lottoAmount) {
        return Array.from({length: lottoAmount}, () => new Lotto(this, lottoCustomer, this.#makeLottoNumbers()));
    }

    storeLottoList(lottoList) {
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

    #getWinnerMatchCount(lotto,winningNumbers) {
        return lotto.lottoNumbers.filter(number => winningNumbers.includes(number)).length;
    }

    #getBonusMatchCount(lotto, bonusNumber) {
        return lotto.lottoNumbers.includes(bonusNumber);
    }

    #getWinningRank(matchCount, matchBonus) {
        if (matchCount === 6) {
            return 1
        }
        if (matchCount === 5 && matchBonus) {
            return 2
        }
        if (matchCount === 5) {
            return 3
        }
        if (matchCount === 4) {
            return 4
        }
        if (matchCount === 3) {
            return 5
        }
        return 0;
    }

    #checkLotto(lotto, winningNumbers, bonusNumber) {
        const winnerMatchCount = this.#getWinnerMatchCount(lotto, winningNumbers);
        const bonusMatchCount = this.#getBonusMatchCount(lotto, bonusNumber);
        lotto.setWinningRank(this.#getWinningRank(winnerMatchCount, bonusMatchCount));
    }

    checkLottoWinners(winningNumbers, bonusNumber){
        this.#issuedLottoList.forEach(lotto => {
            this.#checkLotto(lotto, winningNumbers, bonusNumber);
        })
    }
    getPrize(winningRank) {
        return this.#LOTTO_PRIZE[winningRank] ?? 0;
    }
}