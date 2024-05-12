import { generateRandomNumbers } from '../utils';
import Lotto from './Lotto';

export const ERROR_MESSAGE_LACK_MONEY = '로또 구매 하기에 금액이 부족합니다.';
export const ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS = '당첨번호가 입력되지 않았습니다.';
export const ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER = '보너스 넘버가 입력되지 않았습니다.';

export const RADIX_INTEGER = 10;

export const LOTTO_5TH_PRIZE_WINNER = 3;
export const LOTTO_4TH_PRIZE_WINNER = 4;
export const LOTTO_3RD_PRIZE_WINNER = 5;
export const LOTTO_SECOND_PRIZE_WINNER = 7;
export const LOTTO_FIRST_PRIZE_WINNER = 6;

const LOTTO_PRICE = 1000;
const LOTTO_TOTAL_COUNT = 6;
const LOTTO_MAX_NUMBER = 45;
const LOTTO_BONUS_COUNT = 5;

const BONUS_WINNING = 7;

class LottoMachine {
  #winnigNumbers;
  #bonusNumber;

  constructor() {
    this.#winnigNumbers = [];
    this.#bonusNumber = 0;
  }

  get winnigNumbers() {
    return this.#winnigNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  set winnigNumbers(numbers) {
    this.#winnigNumbers = numbers;
  }

  set bonusNumber(number) {
    this.#bonusNumber = number;
  }

  validCheckAmount(prices) {
    if (prices < LOTTO_PRICE) throw new Error(ERROR_MESSAGE_LACK_MONEY);
  }

  validEnterWinningNumbers() {
    if (this.#winnigNumbers.length !== LOTTO_TOTAL_COUNT)
      throw new Error(ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS);
  }

  validEnterBonusNumber() {
    if (this.#bonusNumber === 0) throw new Error(ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER);
  }

  createLottos(inputPrices) {
    this.validCheckAmount(inputPrices);
    const numberLottoPurchases = Math.floor(inputPrices / LOTTO_PRICE);

    return [...Array(numberLottoPurchases)].map(
      () => new Lotto(this.generateLottoNumbers())
    );
  }

  generateLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length !== LOTTO_TOTAL_COUNT) {
      const number = generateRandomNumbers(LOTTO_MAX_NUMBER, RADIX_INTEGER);
      if (!lottoNumbers.includes(number)) {
        lottoNumbers.push(number);
      }
    }

    return lottoNumbers;
  }

  resultsLottoWinning(lotto) {
    const result = lotto.filter((number) => this.#winnigNumbers.includes(number)).length;

    if (result === LOTTO_BONUS_COUNT) {
      const bonus = lotto.filter((number) => number === this.#bonusNumber);
      if (bonus.length === 1) {
        return BONUS_WINNING;
      }
    }

    return result;
  }

  checkLottoWinning(lottos) {
    this.validEnterWinningNumbers();
    this.validEnterBonusNumber();

    const result = lottos.map((lotto) => {
      lotto.result = this.resultsLottoWinning(lotto.numbers);
      return lotto;
    });

    return result;
  }

  switchResultToMoney(result) {
    switch (result) {
      case LOTTO_5TH_PRIZE_WINNER:
        return 5000;
      case LOTTO_4TH_PRIZE_WINNER:
        return 50000;
      case LOTTO_3RD_PRIZE_WINNER:
        return 1500000;
      case LOTTO_SECOND_PRIZE_WINNER:
        return 30000000;
      case LOTTO_FIRST_PRIZE_WINNER:
        return 2000000000;

      default:
        return 0;
    }
  }

  returnsLottos(prices, lottos) {
    const totalProfit = lottos.reduce((acc, lotto) => {
      return acc + this.switchResultToMoney(lotto.result);
    }, 0);

    return (totalProfit / prices).toFixed(2) * 100;
  }
}

export default LottoMachine;
