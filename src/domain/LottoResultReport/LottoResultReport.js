import { LOTTO_INFO } from "../../consts/Lotto.js";

class LottoResultReport {
    #lottoResultSummary;
    #profitRate;
    constructor(lottoList) {
        this.#lottoResultSummary = LOTTO_INFO.WINNING_CONDITION.map(CONDITION => ({
            match: CONDITION.MATCH,
            bonus: CONDITION.BONUS,
            rank: CONDITION.RANK,
            count: this.#getWinningRankCount(lottoList, CONDITION.RANK),
        }))
        this.#profitRate = this.#calculateProfitRate(lottoList);
    }

    #getWinningRankCount(lottoList, winningRank) {
        return lottoList.filter(lotto => lotto.winningRank === winningRank).length;
    }

    #calculateProfitRate(lottoList) {
        const totalInput = lottoList.length * LOTTO_INFO.PRICE;
        const totalPrize = lottoList.reduce((acc, lotto) => acc + (lotto.winningRank && LOTTO_INFO.PRIZE[lotto.winningRank]), 0)
        return totalPrize / totalInput * 100;
    }

    getLottoResultSummary({order}={order: 'ASC'}) {
        return order === 'DESC' ? this.#lottoResultSummary.reverse() : this.#lottoResultSummary;
    }

    getProfitRate() {
        return this.#profitRate;
    }
}

export default LottoResultReport;