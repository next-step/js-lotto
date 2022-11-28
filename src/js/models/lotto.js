import { ZERO_NUMBER, ERROR_MESSAGE, LOTTO } from '../../const.js';
import { getRandomNumber } from '../../utils.js';

class Lotto {
  #price;
  #lottoCount;
  #lottos;
  #winningNumbers;
  #result;
  #profit;

  constructor() {
    this.#price = ZERO_NUMBER;
    this.#lottoCount = ZERO_NUMBER;
    this.#profit = ZERO_NUMBER;
    this.#lottos = [];
    this.#winningNumbers = [];
    this.#result = {
      3: ZERO_NUMBER,
      4: ZERO_NUMBER,
      5: ZERO_NUMBER,
      6: ZERO_NUMBER,
      7: ZERO_NUMBER,
    };
  }

  setPrice = (nextPrice) => {
    this.#price = nextPrice;
  };

  setWinningNumbers = (winningNumber, numberIndex) => {
    this.#winningNumbers[numberIndex] = winningNumber;
  };

  setProfit = (nextProfit) => {
    this.#profit = nextProfit;
  };

  get price() {
    return this.#price;
  }

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

  registerLotto = () => {
    this.#lottoCount = Math.floor(this.#price / LOTTO.PRICE);
    this.#lottos = [];

    for (let i = 0; i < this.#lottoCount; i++) {
      this.#lottos.push(this.#getUniqRandomNumbers());
    }
  };

  setResult = (winningNumberCount) => {
    if (this.#result[winningNumberCount] !== undefined) {
      this.#result[winningNumberCount] += 1;
    }
  };

  clear = () => {
    this.#price = ZERO_NUMBER;
    this.#lottoCount = ZERO_NUMBER;
    this.#profit = ZERO_NUMBER;
    this.#lottos = [];
    this.#winningNumbers = [];
    this.#result = {
      3: ZERO_NUMBER,
      4: ZERO_NUMBER,
      5: ZERO_NUMBER,
      6: ZERO_NUMBER,
      7: ZERO_NUMBER,
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
