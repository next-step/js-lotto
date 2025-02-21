import LottoGenerator from "./LottoGenerator.js";
import FirstPrize from "./prize/FirstPrize.js";
import SecondPrize from "./prize/SecondPrize.js";
import ThirdPrize from "./prize/ThirdPrize.js";
import FifthPrize from "./prize/FifthPrize.js";
import FourthPrize from "./prize/FourthPrize.js";

class LottoGame {
  static LOTTO_PRICE = 1000;
  #lottos;
  #prizes;

  constructor(lottos = []) {
    this.#lottos = lottos;
    this.#prizes = [
      new FirstPrize(),
      new SecondPrize(),
      new ThirdPrize(),
      new FourthPrize(),
      new FifthPrize(),
    ];
  }

  buyLottos(budget) {
    const lottoCount = budget.getLottoCount(LottoGame.LOTTO_PRICE);
    this.#lottos = LottoGenerator.generateLottos(lottoCount);
  }

  calculateTotalWinningAmount(budget, winningLotto) {
    const totalAmount = this.#lottos
      .flatMap((lotto) =>
        this.#prizes
          .filter((prize) => prize.matched(lotto, winningLotto))
          .map((prize) => prize.prizeAmount),
      )
      .reduce((total, amount) => total + amount, 0);
    budget.addTotalWinningAmount(totalAmount);
  }

  getLottos() {
    return this.#lottos;
  }

  getWinningStatistics = (winningLotto) => {
    const initialStats = new Map(this.#prizes.map((prize) => [prize, 0]));

    return this.#lottos.reduce((stats, ticket) => {
      const matchedPrize = this.#prizes.find((prize) =>
        prize.matched(ticket, winningLotto),
      );
      if (matchedPrize) {
        stats.set(matchedPrize, stats.get(matchedPrize) + 1);
      }
      return stats;
    }, initialStats);
  };
}

export default LottoGame;
