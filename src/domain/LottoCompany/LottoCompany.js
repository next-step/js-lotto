import {Lotto} from "../Lotto/Lotto.js";
import {LOTTO} from "../../consts/lotto/lotto.const.js";
export class LottoCompany {
    #lottoPrize;
    #lottoPrice;
    #issuedLottoList = [];
    #sellerList = [];
    constructor(lottoPrice, lottoPrize) {
        this.#lottoPrice = lottoPrice;
        this.#lottoPrize = lottoPrize;
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
        while (lottoNumbers.length < LOTTO.SIZE) {
            const lottoNumber = Math.floor(Math.random() * LOTTO.NUMBER_MAX) + LOTTO.NUMBER_MIN;
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
        return this.#lottoPrize[winningRank] ?? 0;
    }
}