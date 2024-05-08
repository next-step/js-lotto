import { generateRamdomNumbers } from '../utils';
import Lotto from './Lotto';

export const ERROR_MESSAGE_LACK_MONEY = '로또 구매 하기에 금액이 부족합니다.';
export const ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS = '당첨번호가 입력되지 않았습니다.';
export const ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER = '보너스 넘버가 입력되지 않았습니다.';

const LOTTO_PRICE = 1000;
const LOTTO_TOTAL_COUNT = 6;
const LOTTO_MAX_NUMBER = 45;
const RADIX_INTEGER = 10;

class LottoMachine {
  #winnigNumbers;
  #bonusNumber;
  #purchasedLottos;

  constructor() {
    this.#winnigNumbers = [];
    this.#bonusNumber = 0;
    this.#purchasedLottos = [];
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

  generateLottoNumbers() {
    return [...Array(6)].map(() =>
      generateRamdomNumbers(LOTTO_MAX_NUMBER, RADIX_INTEGER)
    );
  }

  validEnterWinningNumbers() {
    if (this.#winnigNumbers.length !== LOTTO_TOTAL_COUNT)
      throw new Error(ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS);
  }

  validEnterBonusNumber() {
    if (this.#bonusNumber === 0) throw new Error(ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER);
  }

  statisticsLottoWinning(lottos) {
    this.validEnterWinningNumbers();
    this.validEnterBonusNumber();

    let result = [];
    lottos.forEach((lotto) => {
      result.push(this.resultsLottoWinning(lotto));
    });
  }

  resultsLottoWinning(lotto) {
    return lotto.filter(
      (number) => this.#winnigNumbers.includes(number) || number === this.#bonusNumber
    ).length;
  }

  createLottos(inputPrices) {
    this.validCheckAmount(inputPrices);
    const numberLottoPurchases = inputPrices / LOTTO_PRICE;

    return [...Array(numberLottoPurchases)].map(
      () => new Lotto(this.generateLottoNumbers())
    );
  }
}

export default LottoMachine;
