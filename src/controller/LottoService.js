import { LOTTO, PRIZE_INFO } from "../constants/lottos.js";
import LottoGenerator from "../domain/LottoGenerator.js";
import WinningRankCalculator from "../utils/WinningRankCalculator.js";

class LottoService {
  static generateLottos(count) {
    return LottoGenerator.issueLottoTicket(count);
  }

  static calculateSingleLottoRank({ winningLotto, lotto }) {
    const matchedCount = lotto.countMatches(winningLotto.winningNumbers);
    const hasBonus = lotto.contains(winningLotto.bonusNumber);
    return WinningRankCalculator.calculate(matchedCount, hasBonus);
  }

  static checkWinningResult({ winningLotto, lottos }) {
    const winningResult = new Map([
      [1, 0], //[rank, 당첨된 수]
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]);

    lottos.forEach((lotto) => {
      const rank = this.calculateSingleLottoRank({ winningLotto, lotto });
      if (rank) {
        const currentCount = winningResult.get(rank);
        winningResult.set(rank, currentCount + 1);
      }
    });

    return winningResult;
  }

  static calculateProfitRate({ winningResult, amount }) {
    const totalPrize = this.#calculateTotalPrize(winningResult);
    const numericAmount = Number(amount);
    const profitRate = (totalPrize / numericAmount) * 100;
    return Math.round(profitRate * 10) / 10;
  }

  static #calculateTotalPrize(winningResult) {
    let totalPrize = 0;

    winningResult.forEach((count, rank) => {
      totalPrize += count * PRIZE_INFO[rank].prize;
    });
    return totalPrize;
  }
}
export default LottoService;
