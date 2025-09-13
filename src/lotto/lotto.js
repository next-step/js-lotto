const LOTTO_PRICE = 1000;
const LOTTT_NUMER_RANGE = [
  ...new Array(45).fill(0).map((_, index) => index + 1),
];

class Lotto {
  static LOTTO_NUMBER_COUNT = 6;
  #numbers = [];
  constructor(lottoNumbers) {
    if (lottoNumbers) {
      this.#numbers = lottoNumbers;
    } else {
      this.#numbers = [...LOTTT_NUMER_RANGE]
        .splice(0, Lotto.LOTTO_NUMBER_COUNT)
        .sort(() => Math.random() * 5);
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
      lottoNumbers.every((number) => LOTTT_NUMER_RANGE.includes(number)) &&
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
      LOTTT_NUMER_RANGE.includes(bonusNumber) &&
      new Set([...lotto.getNumbers(), bonusNumber]).size ===
        WinningLotto.WINNING_NUMBER_COUNT
    );
  }
}

const createLotto = (purchaseAmount) => {
  const lottoCount = Math.floor(parseInt(purchaseAmount) / LOTTO_PRICE);
  return new Array(lottoCount).fill(null).map(() => new Lotto());
};

export default {
  Lotto,
  WinningLotto,
  LOTTO_PRICE,
  LOTTT_NUMER_RANGE,
  createLotto,
};
