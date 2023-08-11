import {
  QUESTION_PURCHASE_AMOUNT,
  LOTTO_AMOUNT_UNIT,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBER_COUNT,
  QUESTION_LOTTO_ANSWER,
  QUESTION_LOTTO_BONUS,
  LOTTO_SECOND_PLACE_DEFAULT_COUNT,
  LOTTO_CALCULATED_RANK,
  QUESTION_RESTART,
} from '../constants/lotto.const.js';
import { REGEX_NUMBERS } from '../constants/regex.const.js';
import {
  ERROR_WRONG_LOTTO_ANSWER_MESSAGE,
  ERROR_WRONG_LOTTO_BONUS_MESSAGE,
  ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE,
} from '../constants/error.const.js';
import { getSortedArray } from '../utils/sort.util.js';
import { getRandomNumber } from '../utils/random.util.js';
import { print } from '../utils/common.util.js';

class Lotto {
  #readline = null;

  #purchasedLottoCounts = 0;
  #myLottos = [];
  #lottoAnswer = null;
  #lottoBonus = null;
  #statistics = {
    '1등': 0,
    '2등': 0,
    '3등': 0,
    '4등': 0,
    '5등': 0,
    꽝: 0,
  };

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

          this.setStatistics(
            this.#myLottos,
            this.#lottoAnswer,
            this.#lottoBonus
          );
          this.printWinStatistics(this.#statistics, this.#purchasedLottoCounts);

          this.#readline.question(QUESTION_RESTART, (command) => {
            this.restartOrExit(command);
          });
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

  getStatistics() {
    return this.#statistics;
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

  setStatistics(myLottos, lottoAnswer, lottoBonus) {
    myLottos.forEach((myLotto) => {
      let answerCount = 0;
      lottoAnswer.forEach((answer) => {
        if (myLotto.includes(answer)) {
          answerCount += 1;
        }
      });
      if (
        answerCount === LOTTO_SECOND_PLACE_DEFAULT_COUNT &&
        myLotto.includes(lottoBonus)
      ) {
        this.#statistics['2등'] += 1;
      } else {
        const rank = this.calculateRank(answerCount);
        this.#statistics[rank] += 1;
      }
    });
  }

  calculateRank(count) {
    if (count in LOTTO_CALCULATED_RANK) {
      return LOTTO_CALCULATED_RANK[count];
    }

    return '꽝';
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

      const sortedLottoNumbers = getSortedArray(lottoNumbers, {
        isAscending: true,
      });
      totalLottoNumbers[idx] = sortedLottoNumbers;
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

  printWinStatistics(statistics, purchasedLottoCounts) {
    print('\n당첨 통계');
    print('--------------------');

    let profitRate = 0;

    const purchaseAmount = purchasedLottoCounts * LOTTO_AMOUNT_UNIT;
    const totalProfit =
      2_000_000_000 * statistics['1등'] +
      30_000_000 * statistics['2등'] +
      1_500_000 * statistics['3등'] +
      50_000 * statistics['4등'] +
      5_000 * statistics['5등'];

    profitRate = ((totalProfit - purchaseAmount) / purchaseAmount) * 100;

    print(`3개 일치 (5,000원) - ${statistics['5등']}개`);
    print(`4개 일치 (50,000원) - ${statistics['4등']}개`);
    print(`5개 일치 (1,500,000원) - ${statistics['3등']}개`);
    print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${statistics['2등']}개`);
    print(`6개 일치 (2,000,000,000원) - ${statistics['1등']}개`);
    print(`총 수익률은 ${profitRate}%입니다.`);
    print('');
  }

  restartOrExit(command) {
    const c = command.toLowerCase();
    if (c === 'y') {
      print('');
      this.start();
    } else {
      this.#readline.close();
    }
  }
}

export default Lotto;
