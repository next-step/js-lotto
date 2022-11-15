import {
  DEFAULT_LOTTO_COUNT,
  DEFAULT_PRICE,
  LOTTO_COUNT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_PRICE,
} from '../const.js';
import { getRandomNumber } from '../utils.js';

class Lotto {
  #price;
  #lottoCount;
  #lottos;

  constructor() {
    this.#price = DEFAULT_PRICE;
    this.#lottoCount = DEFAULT_LOTTO_COUNT;
    this.#lottos = [];
  }

  setPrice = (nextPrice) => {
    this.#price = nextPrice;
  };

  getPrice = () => {
    return this.#price;
  };

  getLottoCount = () => {
    return this.#lottoCount;
  };

  getLottos = () => {
    return this.#lottos;
  };

  getErrorMessage = () => {
    if (this.#price % LOTTO_PRICE > DEFAULT_PRICE) {
      return '1,000단위의 숫자를 입력해주세요.';
    }

    if (this.#price <= DEFAULT_PRICE) {
      return '0이상의 숫자를 입력해주세요.';
    }

    return '';
  };

  registerLotto = () => {
    this.#lottoCount = Math.floor(this.#price / LOTTO_PRICE);
    this.#lottos = [];

    for (let i = 0; i < this.#lottoCount; i++) {
      this.#lottos.push(this.#getUniqRandomNumbers());
    }
  };

  #getUniqRandomNumbers() {
    const uniqRandomNumbers = [];
    let finishCount = 0;

    while (finishCount < LOTTO_COUNT) {
      const randomNumber = getRandomNumber(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER);
      if (uniqRandomNumbers.indexOf(randomNumber) < 0) {
        finishCount++;
        uniqRandomNumbers.push(randomNumber);
      }
    }
    return uniqRandomNumbers;
  }
}

export default Lotto;
