import {
  DEFAULT_NUMBER,
  ERROR_MESSAGE,
  LOTTO_BONUS_APPLICABLE_COUNT,
  LOTTO_COUNT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_PRICE,
} from '../../const.js';
import {
  getRandomNumber,
  getSameNumberCount,
  hasDuplicateNumbers,
  isNumbersOutOfRange,
} from '../../utils.js';

class Lotto {
  #price;
  #lottoCount;
  #lottos;
  #winningNumbers;
  #result;
  #winRate;

  constructor() {
    this.#price = DEFAULT_NUMBER;
    this.#lottoCount = DEFAULT_NUMBER;
    this.#winRate = DEFAULT_NUMBER;
    this.#lottos = [];
    this.#winningNumbers = [];
    this.#result = {};
  }

  setPrice = (nextPrice) => {
    this.#price = nextPrice;
  };

  setWinningNumbers = (winningNumber, numberIndex) => {
    this.#winningNumbers[numberIndex] = winningNumber;
  };

  get lottoCount() {
    return this.#lottoCount;
  }

  get lottos() {
    return this.#lottos;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get result() {
    return this.#result;
  }

  get winRate() {
    return this.#winRate;
  }

  validatePrice = () => {
    if (this.#price % LOTTO_PRICE > DEFAULT_NUMBER) {
      window.alert(ERROR_MESSAGE.INVALID_UNIT_NUMBER);
      return false;
    }

    if (this.#price <= DEFAULT_NUMBER) {
      window.alert(ERROR_MESSAGE.INVALID_NEGATIVE_NUMBER);
      return false;
    }

    return true;
  };

  validateWinningNumbers = () => {
    if (hasDuplicateNumbers(this.#winningNumbers)) {
      window.alert(ERROR_MESSAGE.INVALID_DUPLICATED_NUMBER);
      return false;
    }

    if (
      isNumbersOutOfRange({
        max: LOTTO_MAX_NUMBER,
        min: LOTTO_MIN_NUMBER,
        targets: this.#winningNumbers,
      })
    ) {
      window.alert(ERROR_MESSAGE.INVALID_RANGE_NUMBER);
      return false;
    }

    return true;
  };

  registerLotto = () => {
    this.#lottoCount = Math.floor(this.#price / LOTTO_PRICE);
    this.#lottos = [];

    for (let i = 0; i < this.#lottoCount; i++) {
      this.#lottos.push(this.#getUniqRandomNumbers());
    }
  };

  computeWinningNumbers() {
    const winningNumbers = this.#winningNumbers.slice(
      DEFAULT_NUMBER,
      LOTTO_COUNT
    );
    const bonusNumber = this.#winningNumbers[LOTTO_COUNT];

    this.#lottos.forEach((lotto) => {
      const sameNumberCount = getSameNumberCount(lotto, winningNumbers);
      const hasBonusNumber =
        sameNumberCount === LOTTO_BONUS_APPLICABLE_COUNT &&
        winningNumbers.includes(bonusNumber);

      if (hasBonusNumber) {
        this.#setResult(`${sameNumberCount}+bonus`);
        return;
      }

      this.#setResult(sameNumberCount);
    });

    this.#winRate = this.#computeWinRate();
  }

  #setResult(winningNumberCount) {
    if (this.#result[winningNumberCount] === undefined) {
      this.#result[winningNumberCount] = 1;
      return;
    }

    this.#result[winningNumberCount] += 1;
  }

  #computeWinRate() {
    const result = Object.values(this.#result).reduce(
      (accumulator, value) => accumulator + value,
      DEFAULT_NUMBER
    );

    return (result / this.#lottos.length) * 100;
  }

  reset() {
    this.#price = DEFAULT_NUMBER;
    this.#lottoCount = DEFAULT_NUMBER;
    this.#winRate = DEFAULT_NUMBER;
    this.#lottos = [];
    this.#winningNumbers = [];
    this.#result = {};
  }

  #getUniqRandomNumbers() {
    const uniqRandomNumbers = new Set();

    while (uniqRandomNumbers.size < LOTTO_COUNT) {
      const randomNumber = getRandomNumber(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER);
      uniqRandomNumbers.add(randomNumber);
    }

    return Array.from(uniqRandomNumbers);
  }
}

export default Lotto;
