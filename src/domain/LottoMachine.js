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

  generateLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length !== 6) {
      const number = generateRamdomNumbers(45, 10);
      if (!lottoNumbers.includes(number)) {
        lottoNumbers.push(number);
      }
    }

    return lottoNumbers;
  }

  resultsLottoWinning(lotto) {
    return lotto.filter(
      (number) => this.#winnigNumbers.includes(number) || number === this.#bonusNumber
    ).length;
  }

  statisticsLottoWinning(lottos) {
    this.validEnterWinningNumbers();
    this.validEnterBonusNumber();

    const result = [];
    lottos.forEach((lotto) => {
      result.push(this.resultsLottoWinning(lotto));
    });

    return result;
  }

  createLottos(inputPrices) {
    this.validCheckAmount(inputPrices);
    const numberLottoPurchases = Math.floor(inputPrices / LOTTO_PRICE);

    console.log('this.generateLottoNumbers()', this.generateLottoNumbers());
    return [...Array(numberLottoPurchases)].map(
      () => new Lotto(this.generateLottoNumbers())
    );
  }
}

export default LottoMachine;
