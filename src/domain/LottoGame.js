import LottoGenerator from "./LottoGenerator.js";

class LottoGame {
  constructor(budget) {
    this.budget = budget;
    this.lottos = [];
  }

  buyLottos(lottoPrice) {
    const lottoCount = this.budget.getLottoCount(lottoPrice);
    this.lottos = LottoGenerator.generateLottos(lottoCount);
  }

  calculateTotalWinningAmount(winningLotto, prizes) {
    return this.lottos
      .flatMap((lotto) =>
        prizes
          .filter((prize) => prize.matched(lotto, winningLotto))
          .map((prize) => prize.prizeAmount),
      )
      .reduce((total, amount) => total + amount, 0);
  }
}

export default LottoGame;
