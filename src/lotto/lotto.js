import { getRandomNumber, print } from '../utils/common.util.js';
import {
  QUESTION_PURCHASE_AMOUNT,
  LOTTO_AMOUNT_UNIT,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBER_COUNT,
} from '../constants/lotto.const.js';
import { REGEX_NUMBERS } from '../constants/regex.const.js';
import { ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE } from '../constants/error.const.js';

class Lotto {
  #readline = null;
  #purchasedLottoCounts = 0;
  #myLottos = [];

  constructor(readline) {
    this.#readline = readline;
  }

  start() {
    this.#readline.question(QUESTION_PURCHASE_AMOUNT, (purchaseAmount) => {
      if (!this.validatePurchaseAmount(purchaseAmount)) {
        print(ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE);
        this.#readline.close();
      }

      this.setPurchasedLottoCounts(purchaseAmount);
      this.printAmount(this.#purchasedLottoCounts);

      this.setMyLottos(this.createLottoNumbers(this.#purchasedLottoCounts));
      this.printMyLottos(this.#myLottos);
    });
  }

  getPurchasedLottoCounts() {
    return this.#purchasedLottoCounts;
  }

  getMyLottos() {
    return this.#myLottos;
  }

  setPurchasedLottoCounts(amount) {
    this.#purchasedLottoCounts = parseInt(amount) / LOTTO_AMOUNT_UNIT;
  }

  setMyLottos(lottos) {
    this.#myLottos = lottos;
  }

  validatePurchaseAmount(amount) {
    const inValidNumbers = REGEX_NUMBERS.test(amount);
    const isValidUnit = parseInt(amount) % LOTTO_AMOUNT_UNIT === 0;

    if (!inValidNumbers || !isValidUnit) {
      return false;
    }

    return true;
  }

  createLottoNumbers(lottoCounts) {
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

      totalLottoNumbers[idx] = lottoNumbers;
    });

    return totalLottoNumbers;
  }

  printAmount(lottoCounts) {
    print(`${lottoCounts}개를 구매했습니다.`);
  }

  printMyLottos(lottos) {
    lottos.forEach((lotto) => {
      print(lotto);
    });
    print('');
  }
}

export default Lotto;
