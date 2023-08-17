import {
  LOTTO_AMOUNT_UNIT,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBER_COUNT,
  LOTTO_AMOUNT_SEPARATOR,
} from '../constants/lotto.const.js';
import { REGEX_NUMBERS } from '../constants/regex.const.js';
import { getSortedArray } from '../utils/sort.util.js';
import { getRandomNumber } from '../utils/number.util.js';

class Lotto {
  #purchasedLottoCounts = 0;
  #myLottos = [];
  #lottoAnswer = null;
  #lottoBonus = null;

  constructor() {}

  getPurchasedLottoCounts() {
    return this.#purchasedLottoCounts;
  }

  getMyLottos() {
    return this.#myLottos;
  }

  getLottoAnswer() {
    return this.#lottoAnswer;
  }

  getLottoBonus() {
    return this.#lottoBonus;
  }

  setPurchasedLottoCounts(amount) {
    this.#purchasedLottoCounts = parseInt(amount) / LOTTO_AMOUNT_UNIT;
  }

  setMyLottos(purchasedLottoCounts) {
    this.#myLottos = this.publishLottoNumbers(purchasedLottoCounts);
  }

  setLottoAnswer(lottoAnswer) {
    this.#lottoAnswer = lottoAnswer.split(LOTTO_AMOUNT_SEPARATOR).map(Number);
  }

  setLottoBonus(lottoBonus) {
    this.#lottoBonus = parseInt(lottoBonus);
  }

  validatePurchaseAmount(amount) {
    const inValidNumbers = REGEX_NUMBERS.test(amount);
    const isValidUnit = parseInt(amount) % LOTTO_AMOUNT_UNIT === 0;

    if (!inValidNumbers || !isValidUnit) {
      return false;
    }

    return true;
  }

  validateLottoAnswer(lottoAnswer) {
    const isBlank = lottoAnswer.length === 0;

    if (isBlank) {
      return false;
    }

    const lottoNumbers = lottoAnswer.split(LOTTO_AMOUNT_SEPARATOR);

    const isNumbers = lottoNumbers.every((number) =>
      REGEX_NUMBERS.test(number)
    );

    if (!isNumbers) {
      return false;
    }

    const is1To45 = lottoNumbers.every(
      (number) =>
        parseInt(number) >= LOTTO_MIN_NUMBER &&
        parseInt(number) <= LOTTO_MAX_NUMBER
    );

    if (!is1To45) {
      return false;
    }

    const isValidCounts = lottoNumbers.length === LOTTO_NUMBER_COUNT;

    if (!isValidCounts) {
      return false;
    }

    const isDuplicated = new Set(lottoNumbers).size !== lottoNumbers.length;

    if (isDuplicated) {
      return false;
    }

    return true;
  }

  validateLottoBonus(lottoBonus) {
    const isBlank = lottoBonus.length === 0;

    if (isBlank) {
      return false;
    }

    const isNumber = REGEX_NUMBERS.test(lottoBonus);

    if (!isNumber) {
      return false;
    }

    const is1To45 =
      parseInt(lottoBonus) >= LOTTO_MIN_NUMBER &&
      parseInt(lottoBonus) <= LOTTO_MAX_NUMBER;

    if (!is1To45) {
      return false;
    }

    const isDuplicated = this.#lottoAnswer.includes(parseInt(lottoBonus));

    if (isDuplicated) {
      return false;
    }

    return true;
  }

  publishLottoNumbers(lottoCounts) {
    const totalLottoNumbers = Array(lottoCounts).fill([]);

    totalLottoNumbers.forEach((_, idx) => {
      const lottoNumbers = Array(LOTTO_NUMBER_COUNT).fill(null);

      lottoNumbers.forEach((_, idx) => {
        const randomNumber = getRandomNumber(
          LOTTO_MIN_NUMBER,
          LOTTO_MAX_NUMBER,
          [...lottoNumbers]
        );
        lottoNumbers[idx] = randomNumber;
      });

      const sortedLottoNumbers = getSortedArray(lottoNumbers, {
        isAscending: true,
      });
      totalLottoNumbers[idx] = sortedLottoNumbers;
    });

    return totalLottoNumbers;
  }
}

export default Lotto;
