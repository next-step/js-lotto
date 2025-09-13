const LOTTO_PRICE = 1000;
const LOTTO_NUMBER_RANGE = [
  ...new Array(45).fill(0).map((_, index) => index + 1),
];

class Lotto {
  static LOTTO_NUMBER_COUNT = 6;
  #numbers = [];
  constructor(lottoNumbers) {
    if (lottoNumbers) {
      this.#numbers = lottoNumbers;
    } else {
      this.#numbers = [...LOTTO_NUMBER_RANGE]
        .sort(() => Math.random() - 0.5)
        .splice(0, Lotto.LOTTO_NUMBER_COUNT);
    }
    if (!this._validateLottoNumbers(this.getNumbers())) {
      throw new Error("유효하지 않은 로또 번호입니다.");
    }
  }
  getNumbers() {
    return this.#numbers;
  }
  _validateLottoNumbers(lottoNumbers) {
    return (
      Array.isArray(lottoNumbers) &&
      lottoNumbers.every((number) => LOTTO_NUMBER_RANGE.includes(number)) &&
      new Set(lottoNumbers).size === Lotto.LOTTO_NUMBER_COUNT
    );
  }
}

class WinningLotto {
  static WINNING_NUMBER_COUNT = 7;
  #lotto;
  #bonusNumber;
  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
    if (!this._validateWinningLotto(lotto, bonusNumber)) {
      throw new Error("유효하지 않은 당첨 번호입니다.");
    }
  }
  getNumbers() {
    return this.#lotto.getNumbers();
  }
  getBonusNumber() {
    return this.#bonusNumber;
  }

  _validateWinningLotto(lotto, bonusNumber) {
    return (
      LOTTO_NUMBER_RANGE.includes(bonusNumber) &&
      new Set([...lotto.getNumbers(), bonusNumber]).size ===
        WinningLotto.WINNING_NUMBER_COUNT
    );
  }
}

class LottoWinningRule {
  static FIRST_PRIZE = {
    matchedNumberCount: 6,
    matchedBonusNumberCount: 0,
    prize: 2000000000,
  };
  static SECOND_PRIZE = {
    matchedNumberCount: 5,
    matchedBonusNumberCount: 1,
    prize: 30000000,
  };
  static THIRD_PRIZE = {
    matchedNumberCount: 5,
    matchedBonusNumberCount: 0,
    prize: 1500000,
  };
  static FOURTH_PRIZE = {
    matchedNumberCount: 4,
    matchedBonusNumberCount: 0,
    prize: 50000,
  };
  static FIFTH_PRIZE = {
    matchedNumberCount: 3,
    matchedBonusNumberCount: 0,
    prize: 5000,
  };

  static PRIZE_MAP = {
    "6:0": LottoWinningRule.FIRST_PRIZE,
    "5:1": LottoWinningRule.SECOND_PRIZE,
    "5:0": LottoWinningRule.THIRD_PRIZE,
    "4:0": LottoWinningRule.FOURTH_PRIZE,
    "3:0": LottoWinningRule.FIFTH_PRIZE,
  };

  static getPrize(winningLotto, lotto) {
    const matchedNumberCount = winningLotto
      .getNumbers()
      .filter((number) => lotto.getNumbers().includes(number)).length;
    const matchedBonusNumberCount = lotto
      .getNumbers()
      .includes(winningLotto.getBonusNumber())
      ? 1
      : 0;

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

const createLotto = (purchaseAmount) => {
  const lottoCount = Math.floor(parseInt(purchaseAmount) / LOTTO_PRICE);
  return new Array(lottoCount).fill(null).map(() => new Lotto());
};

export default {
  Lotto,
  WinningLotto,
  LottoWinningRule,
  LOTTO_PRICE,
  LOTTO_NUMBER_RANGE,
  createLotto,
};
