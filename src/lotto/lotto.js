const LOTTO_PRICE = 1000;

class CommonLotto {
  static LOTTO_NUMBER_RANGE = [
    ...new Array(45).fill(0).map((_, index) => index + 1),
  ];
  #numbers = [];
  constructor(lottoNumbers = this.generateLottoNumbers()) {
    if (!this.#validateLottoNumbers(lottoNumbers)) {
      throw new Error("유효하지 않은 로또 번호입니다.");
    }
    this.#numbers = lottoNumbers;
  }
  getNumbers() {
    return this.#numbers;
  }

  #validateLottoNumbers(lottoNumbers) {
    return (
      Array.isArray(lottoNumbers) &&
      this.validateNumbers(lottoNumbers) &&
      this.isUniqueNumbers(lottoNumbers)
    );
  }
  isUniqueNumbers(numbers) {
    return new Set(numbers).size === numbers.length;
  }

  generateLottoNumbers(numberCount) {
    return [...CommonLotto.LOTTO_NUMBER_RANGE]
      .sort(() => Math.random() - 0.5)
      .splice(0, numberCount);
  }

  validateNumbers(lottoNumbers) {
    return lottoNumbers.every((number) => this.validateNumber(number));
  }

  validateNumber(number) {
    return CommonLotto.LOTTO_NUMBER_RANGE.includes(number);
  }
}

class Lotto extends CommonLotto {
  static #LOTTO_NUMBER_COUNT = 6;
  constructor(lottoNumbers) {
    super(lottoNumbers);
  }

  generateLottoNumbers() {
    return super.generateLottoNumbers(Lotto.#LOTTO_NUMBER_COUNT);
  }
}

class BonusLotto extends CommonLotto {
  static #LOTTO_NUMBER_COUNT = 1;

  constructor(lottoNumbers) {
    super(lottoNumbers);
  }
  generateLottoNumbers() {
    return super.generateLottoNumbers(BonusLotto.#LOTTO_NUMBER_COUNT);
  }
}

class WinningLotto {
  static WINNING_NUMBER_COUNT = 7;
  #lotto;
  #bonusNumber;
  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
    if (!this.#validateWinningLotto(lotto, bonusNumber)) {
      throw new Error("유효하지 않은 당첨 번호입니다.");
    }
  }
  getNumbers() {
    return this.#lotto.getNumbers();
  }
  getBonusNumber() {
    return this.#bonusNumber.getNumbers();
  }

  #validateWinningLotto(lotto, bonusNumber) {
    const lottoNumbers = [...lotto.getNumbers(), ...bonusNumber.getNumbers()];
    return new Set(lottoNumbers).size === lottoNumbers.length;
  }
}

class LottoMatchResult {
  #matchedNumberCount = 0;
  #matchedBonusNumberCount = 0;
  constructor(matchedNumberCount, matchedBonusNumberCount) {
    this.#matchedNumberCount = matchedNumberCount;
    this.#matchedBonusNumberCount = matchedBonusNumberCount;

    Object.freeze(this);
  }
  getMatchedNumberCount() {
    return this.#matchedNumberCount;
  }
  getMatchedBonusNumberCount() {
    return this.#matchedBonusNumberCount;
  }
}

class LottoWinningRule {
  static FIRST_PRIZE = {
    matchedNumberCount: 6,
    matchedBonusNumberCount: 0,
    prize: 2_000_000_000,
  };
  static SECOND_PRIZE = {
    matchedNumberCount: 5,
    matchedBonusNumberCount: 1,
    prize: 30_000_000,
  };
  static THIRD_PRIZE = {
    matchedNumberCount: 5,
    matchedBonusNumberCount: 0,
    prize: 1500000,
  };
  static FOURTH_PRIZE = {
    matchedNumberCount: 4,
    matchedBonusNumberCount: 0,
    prize: 50_000,
  };
  static FIFTH_PRIZE = {
    matchedNumberCount: 3,
    matchedBonusNumberCount: 0,
    prize: 5_000,
  };

  static PRIZE_LIST = [
    LottoWinningRule.FIRST_PRIZE,
    LottoWinningRule.SECOND_PRIZE,
    LottoWinningRule.THIRD_PRIZE,
    LottoWinningRule.FOURTH_PRIZE,
    LottoWinningRule.FIFTH_PRIZE,
  ];

  static PRIZE_MAP = {
    "6:0": LottoWinningRule.FIRST_PRIZE,
    "5:1": LottoWinningRule.SECOND_PRIZE,
    "5:0": LottoWinningRule.THIRD_PRIZE,
    "4:0": LottoWinningRule.FOURTH_PRIZE,
    "3:0": LottoWinningRule.FIFTH_PRIZE,
  };

  static getMatchResult(winningLotto, lotto) {
    const matchedNumberCount = winningLotto
      .getNumbers()
      .filter((number) => lotto.getNumbers().includes(number)).length;
    const matchedBonusNumberCount = winningLotto
      .getBonusNumber()
      .filter((number) => lotto.getNumbers().includes(number)).length;

    return new LottoMatchResult(matchedNumberCount, matchedBonusNumberCount);
  }

  static getLottoPrize(lottoMatchResult) {
    return LottoWinningRule.PRIZE_MAP[
      `${lottoMatchResult.getMatchedNumberCount()}:${lottoMatchResult.getMatchedBonusNumberCount()}`
    ];
  }

  static getPrize(winningLotto, lotto) {
    const matchedNumberCount = winningLotto
      .getNumbers()
      .filter((number) => lotto.getNumbers().includes(number)).length;
    const matchedBonusNumberCount = winningLotto
      .getBonusNumber()
      .filter((number) => lotto.getNumbers().includes(number)).length;

    return LottoWinningRule.PRIZE_MAP[
      `${matchedNumberCount}:${matchedBonusNumberCount}`
    ];
  }

  static getWinningResult(winningLotto, lottos) {
    return lottos
      .map((lotto) => LottoWinningRule.getPrize(winningLotto, lotto))
      .filter((prize) => prize ?? false);
  }

  static getWinningRate(winningResult, purchaseAmount) {
    return (
      (winningResult.reduce((acc, prize) => acc + prize.prize, 0) /
        purchaseAmount) *
      100
    );
  }

  static getWinningReport(winningResult = [], purchaseAmount) {
    const matched = new Map();
    winningResult.forEach((prize) => {
      matched.set(prize, matched.get(prize) ? matched.get(prize) + 1 : 1);
    });
    return {
      matched,
      winningRate: LottoWinningRule.getWinningRate(
        winningResult,
        purchaseAmount
      ),
    };
  }
}

class LottoStore {
  #lottoPrice = 0;
  #lottoType;
  constructor(lottoPrice, lottoType) {
    this.#lottoPrice = lottoPrice;
    this.#lottoType = lottoType;
  }

  buyLottos(purchaseAmount) {
    if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
      throw new Error("유효하지 않은 구입 금액입니다.");
    }
    const lottoCount = this.#calculateLottoCount(purchaseAmount);
    return this.#createLottos(lottoCount);
  }

  #calculateLottoCount(purchaseAmount) {
    return Math.floor(purchaseAmount / this.#lottoPrice);
  }

  #createLottos(lottoCount) {
    return new Array(lottoCount).fill(null).map(() => new this.#lottoType());
  }
}

export default {
  Lotto,
  BonusLotto,
  WinningLotto,
  LottoWinningRule,
  LOTTO_PRICE,
  LottoStore,
  LottoMatchResult,
};
