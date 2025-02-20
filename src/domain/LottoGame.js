import Lotto from "./Lotto.js";
import LottoPrize from "./LottoPrize.js";

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
  static PRIZE_CONDITIONS = [
    {
      requiredMatchCount: 3,
      bonusMatched: false,
      prizeMoney: 5000,
    },
    {
      requiredMatchCount: 4,
      bonusMatched: false,
      prizeMoney: 50000,
    },
    {
      requiredMatchCount: 5,
      bonusMatched: false,
      prizeMoney: 1500000,
    },
    {
      requiredMatchCount: 5,
      bonusMatched: true,
      prizeMoney: 30000000,
    },
    {
      requiredMatchCount: 6,
      bonusMatched: false,
      prizeMoney: 2000000000,
    },
  ];

  #purchasedLottos = [];
  #prizes = [];

  constructor() {
    this.#prizes = LottoGame.PRIZE_CONDITIONS.map(
      ({ requiredMatchCount, bonusMatched, prizeMoney }) =>
        new LottoPrize(requiredMatchCount, bonusMatched, prizeMoney)
    );
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

  getReturnRate(
    quantity = this.#purchasedLottos.length,
    prizes = this.#prizes
  ) {
    const prizeMoney = prizes.reduce((acc, prize) => {
      if (prize.matchCount > 0) {
        return acc + prize.prizeMoney * prize.matchCount;
      }
      return acc;
    }, 0);

    const returnRate =
      (prizeMoney / (quantity * LottoGame.PRICE_PER_LOTTO)) * 100;

    return Math.floor(returnRate);
  }

  draw(
    winningNumber,
    bonusNumber,
    lottos = this.#purchasedLottos,
    prizes = this.#prizes
  ) {
    LottoGame.validateDrawNumbers(winningNumber, bonusNumber);

    const lottoMatchedResults = lottos.map((lotto) => {
      const matchCount = lotto.getMatchCount(winningNumber);
      const bonusMatched = !!lotto.getMatchCount([bonusNumber]);

      return { matchCount, bonusMatched };
    });

    prizes.forEach((prize) => {
      prize.checkPrizeMatch(lottoMatchedResults);
    });

    const results = prizes.map(
      ({ requiredMatchCount, bonusMatched, prizeMoney, matchCount }) => {
        return {
          requiredMatchCount,
          bonusMatched,
          prizeMoney,
          matchCount,
        };
      }
    );

    return results;
  }
}
