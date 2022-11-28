import { DEFAULT_NUMBER, ERROR_MESSAGE, LOTTO, PROFIT } from '../../const.js';
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
  #profit;

  constructor() {
    this.#price = DEFAULT_NUMBER;
    this.#lottoCount = DEFAULT_NUMBER;
    this.#profit = DEFAULT_NUMBER;
    this.#lottos = [];
    this.#winningNumbers = [];
    this.#result = {
      3: DEFAULT_NUMBER,
      4: DEFAULT_NUMBER,
      5: DEFAULT_NUMBER,
      6: DEFAULT_NUMBER,
      7: DEFAULT_NUMBER,
    };
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

  get profit() {
    return this.#profit;
  }

  validatePrice = () => {
    if (this.#price % LOTTO.PRICE > DEFAULT_NUMBER) {
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
    if (
      isNumbersOutOfRange({
        max: LOTTO.MAX_NUMBER,
        min: LOTTO.MIN_NUMBER,
        targets: this.#winningNumbers,
      })
    ) {
      window.alert(ERROR_MESSAGE.INVALID_RANGE_NUMBER);
      return false;
    }

    if (hasDuplicateNumbers(this.#winningNumbers)) {
      window.alert(ERROR_MESSAGE.INVALID_DUPLICATED_NUMBER);
      return false;
    }

    return true;
  };

  registerLotto = () => {
    this.#lottoCount = Math.floor(this.#price / LOTTO.PRICE);
    this.#lottos = [];

    for (let i = 0; i < this.#lottoCount; i++) {
      this.#lottos.push(this.#getUniqRandomNumbers());
    }
  };

  computeWinningNumbers = () => {
    const winningNumbers = this.#winningNumbers.slice(
      DEFAULT_NUMBER,
      LOTTO.COUNT
    );
    const bonusNumber = this.#winningNumbers[LOTTO.COUNT];

    this.#lottos.forEach((lotto) => {
      const sameNumberCount = getSameNumberCount(lotto, winningNumbers);
      const hasBonusNumber =
        sameNumberCount === LOTTO.BONUS_APPLICABLE_COUNT &&
        winningNumbers.includes(bonusNumber);

      if (hasBonusNumber) {
        this.#setResult(6);
        return;
      }

      if (sameNumberCount === 6) {
        this.#setResult(7);
        return;
      }

      this.#setResult(sameNumberCount);
    });

    this.#profit = this.#computeProfit();
  };

  #setResult(winningNumberCount) {
    if (this.#result[winningNumberCount] !== undefined) {
      this.#result[winningNumberCount] += 1;
    }
  }

  #computeProfit() {
    const result = Object.keys(this.#result).reduce(
      (accumulator, key) => accumulator + this.#result[key] * PROFIT[key].PRICE,
      DEFAULT_NUMBER
    );

    return ((result - this.#price) / this.#price) * 100;
  }

  clear = () => {
    this.#price = DEFAULT_NUMBER;
    this.#lottoCount = DEFAULT_NUMBER;
    this.#profit = DEFAULT_NUMBER;
    this.#lottos = [];
    this.#winningNumbers = [];
    this.#result = {
      3: DEFAULT_NUMBER,
      4: DEFAULT_NUMBER,
      5: DEFAULT_NUMBER,
      6: DEFAULT_NUMBER,
      7: DEFAULT_NUMBER,
    };
  };

  #getUniqRandomNumbers() {
    const uniqRandomNumbers = new Set();

    while (uniqRandomNumbers.size < LOTTO.COUNT) {
      const randomNumber = getRandomNumber(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER);
      uniqRandomNumbers.add(randomNumber);
    }

    return Array.from(uniqRandomNumbers);
  }
}

export default Lotto;
