import { getRandomNumber, print } from '../utils/common.util.js';
import {
  QUESTION_PURCHASE_AMOUNT,
  LOTTO_AMOUNT_UNIT,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBER_COUNT,
  QUESTION_LOTTO_ANSWER,
  QUESTION_LOTTO_BONUS,
} from '../constants/lotto.const.js';
import { REGEX_NUMBERS } from '../constants/regex.const.js';
import {
  ERROR_WRONG_LOTTO_ANSWER_MESSAGE,
  ERROR_WRONG_LOTTO_BONUS_MESSAGE,
  ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE,
} from '../constants/error.const.js';

class Lotto {
  #readline = null;

  #purchasedLottoCounts = 0;
  #myLottos = [];
  #lottoAnswer = null;
  #lottoBonus = null;

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

      this.setMyLottos(this.#purchasedLottoCounts);
      this.printMyLottos(this.#myLottos);

      this.#readline.question(QUESTION_LOTTO_ANSWER, (lottoAnswer) => {
        if (!this.validateLottoAnswer(lottoAnswer)) {
          print(ERROR_WRONG_LOTTO_ANSWER_MESSAGE);
          this.#readline.close();
        }

        this.setLottoAnswer(lottoAnswer);

        this.#readline.question(`\n${QUESTION_LOTTO_BONUS}`, (lottoBonus) => {
          if (!this.validateLottoBonus(lottoBonus)) {
            print(ERROR_WRONG_LOTTO_BONUS_MESSAGE);
            this.#readline.close();
          }

          this.setLottoBonus(lottoBonus);
        });
      });
    });
  }

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
    this.#myLottos = this.createLottoNumbers(purchasedLottoCounts);
  }

  setLottoAnswer(lottoAnswer) {
    this.#lottoAnswer = lottoAnswer.split(',').map(Number);
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

    const lottoNumbers = lottoAnswer.split(',');

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
