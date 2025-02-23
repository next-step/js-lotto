import Lotto from "./Lotto.js";
import LottoPrizes from "./LottoPrizes.js";

class LottoPurchaseError extends Error {
  constructor(purchaseUnit) {
    super(`구입 금액은 ${purchaseUnit}원 단위로 입력해야 합니다.`);
  }
}

class InvalidWinningNumberLength extends Error {
  constructor(selectionCount) {
    super(
      `당첨 번호는 ${selectionCount}개, 보너스 번호는 1개를 입력해야 합니다.`
    );
  }
}

class InvalidLottoDrawNumber extends Error {
  constructor(min, max) {
    super(`당첨 번호는 ${min} 이상 ${max} 이하 숫자여야 합니다.`);
  }
}

export default class LottoGame {
  static PRICE_PER_LOTTO = 1000;
  static LOTTO_SELECTION_COUNT = 6;
  static NUMBER_MIN_RANGE = 1;
  static NUMBER_MAX_RANGE = 45;

  #purchasedLottos = [];
  #prizes;

  constructor(prizes) {
    this.#prizes = prizes;
  }

  static validatePurchaseAmount(purchaseAmount) {
    if (
      typeof purchaseAmount !== "number" ||
      purchaseAmount < 0 ||
      purchaseAmount % LottoGame.PRICE_PER_LOTTO !== 0
    ) {
      throw new LottoPurchaseError(LottoGame.PRICE_PER_LOTTO);
    }
  }

  static validateDrawNumbers(winningNumber, bonusNumber) {
    if (winningNumber.length !== LottoGame.LOTTO_SELECTION_COUNT) {
      throw new InvalidWinningNumberLength(LottoGame.LOTTO_SELECTION_COUNT);
    }

    const numbers = winningNumber.concat(bonusNumber);
    const min = LottoGame.NUMBER_MIN_RANGE;
    const max = LottoGame.NUMBER_MAX_RANGE;
    numbers.forEach((number) => {
      if (typeof number !== "number" || number < min || number > max) {
        throw new InvalidLottoDrawNumber(min, max);
      }
    });
  }

  static validWinningNumberLength(numbers) {
    if (numbers.length !== LottoGame.LOTTO_SELECTION_COUNT)
      throw new InvalidLottoWinningLength(LottoGame.LOTTO_SELECTION_COUNT);
  }

  purchase(purchaseAmount) {
    LottoGame.validatePurchaseAmount(purchaseAmount);

    const quantity = purchaseAmount / LottoGame.PRICE_PER_LOTTO;
    this.#purchasedLottos = Array.from(
      { length: quantity },
      () =>
        new Lotto(
          LottoGame.NUMBER_MIN_RANGE,
          LottoGame.NUMBER_MAX_RANGE,
          LottoGame.LOTTO_SELECTION_COUNT
        )
    );

    return this.#purchasedLottos.map((lotto) => lotto.numbers);
  }

  getReturnRate(quantity) {
    const prizeMoney = this.#prizes.getPrizeMoney();

    const returnRate =
      (prizeMoney / (quantity * LottoGame.PRICE_PER_LOTTO)) * 100;

    return Math.floor(returnRate);
  }

  getMatchedResults(winningNumbers, bonusNumber, lottos) {
    LottoGame.validateDrawNumbers(winningNumbers, bonusNumber);

    return lottos.map((lotto) => {
      const matchCount = lotto.getMatchCount(winningNumbers);
      const bonusMatched = !!lotto.getMatchCount([bonusNumber]);

      return { matchCount, bonusMatched };
    });
  }

  draw(winningNumbers, bonusNumber, lottos = this.#purchasedLottos) {
    const lottoMatchedResults = this.getMatchedResults(
      winningNumbers,
      bonusNumber,
      lottos
    );

    this.#prizes.checkPrizeMatch(lottoMatchedResults);

    return this.#prizes.status;
  }
}
