import {LOTTO_INFO} from "../../consts/Lotto.js";

export class LottoList {
    #lottoList = [];

    constructor(lottoList) {
        this.#lottoList = lottoList;
    };

    get lottoList() {
        return this.#lottoList;
    };

    setWinningRank(winningNumbers, bonusNumber) {
        this.#lottoList.forEach(lotto => lotto.setWinningRank(winningNumbers, bonusNumber));
    }

    #getWinningRankCount(winningRank) {
        return this.#lottoList.filter(lotto => lotto.winningRank === winningRank).length;
    };

    getLottoResultSummary({order= 'ASC'}){
        const resultSummary = LOTTO_INFO.WINNING_CONDITION.map(CONDITION => ({
            match: CONDITION.MATCH,
            bonus: CONDITION.BONUS,
            rank: CONDITION.RANK,
            count: this.#getWinningRankCount(CONDITION.RANK),
        }))

        return order === 'DESC' ? resultSummary.reverse() : resultSummary;
    }

    getProfitRate() {
        const totalInput = this.#lottoList.length * LOTTO_INFO.PRICE;
        const totalPrize = this.#lottoList.reduce((acc, lotto) => acc + (lotto.winningRank && LOTTO_INFO.PRIZE[lotto.winningRank]), 0)
        return totalPrize / totalInput * 100;
    }
}