import Lottos from "./Lottos.js";
import LottoPrizes from "./LottoPrizes.js";

class LottoPurchaseError extends Error {
  constructor(purchaseUnit) {
    super(`구입 금액은 ${purchaseUnit}원 단위로 입력해야 합니다.`);
  }
}

export default class LottoGame {
  static PRICE_PER_LOTTO = 1000;

  #lottos;
  #prizes;

  constructor(lottos, prizes) {
    this.#lottos = lottos;
    this.#prizes = prizes ?? new LottoPrizes();
  }

  static validatePurchaseAmount(purchaseAmount, price) {
    if (
      !Number.isInteger(purchaseAmount) ||
      purchaseAmount < 0 ||
      purchaseAmount % price !== 0
    ) {
      throw new LottoPurchaseError(price);
    }
  }

  purchase(purchaseAmount) {
    LottoGame.validatePurchaseAmount(purchaseAmount, LottoGame.PRICE_PER_LOTTO);

    const quantity = purchaseAmount / LottoGame.PRICE_PER_LOTTO;
    this.#lottos = Array.from({ length: quantity }, () => new Lottos());

    return this.#lottos.map((lotto) => lotto.values);
  }

  getReturnRate() {
    const prizeMoney = this.#prizes.getPrizeMoney();

    const returnRate =
      (prizeMoney / (this.#lottos.length * LottoGame.PRICE_PER_LOTTO)) * 100;

    return Math.floor(returnRate);
  }

  getMatchedResults(winningNumbers, bonusNumber) {
    return this.#lottos.map((lottos) => {
      const matchCount = lottos.getMatchCount(winningNumbers);
      const bonusMatched = !!lottos.getMatchCount([bonusNumber]);
      return { matchCount, bonusMatched };
    });
  }

  draw(drawNumbers) {
    const { winningNumbers, bonusNumber } = drawNumbers.values;

    const lottoMatchedResults = this.getMatchedResults(
      winningNumbers,
      bonusNumber
    );

    this.#prizes.checkPrizeMatch(lottoMatchedResults);

    return this.#prizes.status;
  }
}
