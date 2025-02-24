import Prize from "./prize/Prize.js";
import {
  bonusMatchingStrategy,
  defaultMatchingStrategy,
  nonBonusMatchingStrategy,
} from "./prize/matchingStrategies.js";
import { generateLottos } from "./lottoGenerator.js";

class LottoGame {
  static LOTTO_PRICE = 1000;
  static PRIZES = [
    new Prize(2_000_000_000, defaultMatchingStrategy(6)),
    new Prize(30_000_000, bonusMatchingStrategy(5)),
    new Prize(1_500_000, nonBonusMatchingStrategy(5)),
    new Prize(50_000, defaultMatchingStrategy(4)),
    new Prize(5000, defaultMatchingStrategy(3)),
  ];

  #lottos;
  #budget;

  constructor(budget, lottos = []) {
    this.#budget = budget;
    this.#lottos = lottos;
  }

  buyLottos() {
    const lottoCount = this.#budget.getLottoCount(LottoGame.LOTTO_PRICE);
    this.#lottos = generateLottos(lottoCount);
  }

  getLottoCount() {
    return this.#lottos.length;
  }

  calculateTotalWinningAmount(winningLotto) {
    const totalAmount = this.#lottos
      .flatMap((lotto) =>
        LottoGame.PRIZES.filter((prize) =>
          prize.matched(lotto, winningLotto),
        ).map((prize) => prize.prizeAmount),
      )
      .reduce((total, amount) => total + amount, 0);
    this.#budget.addTotalWinningAmount(totalAmount);
  }

  getProfit() {
    return this.#budget.getProfit();
  }

  getLottos() {
    return [...this.#lottos];
  }

  getWinningStatistics(winningLotto) {
    return this.#lottos.reduce(
      (stats, lotto) => {
        const matchedPrize = this.#findMatchedPrize(lotto, winningLotto);
        if (matchedPrize) {
          stats.set(matchedPrize, stats.get(matchedPrize) + 1);
        }
        return stats;
      },
      new Map(LottoGame.PRIZES.map((prize) => [prize, 0])),
    );
  }

  #findMatchedPrize(lotto, winningLotto) {
    return LottoGame.PRIZES.find((prize) => prize.matched(lotto, winningLotto));
  }
}

export default LottoGame;
