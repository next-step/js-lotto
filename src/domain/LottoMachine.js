import { generateRamdomNumbers } from '../utils';
import Lotto from './Lotto';

export const ERROR_MESSAGE_LACK_MONEY = '로또 구매 하기에 금액이 부족합니다.';

class LottoMachine {
  #winnigNumbers;
  #bonusNumber;

  constructor() {}

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
    if (prices < 1000) throw new Error(ERROR_MESSAGE_LACK_MONEY);
  }

  generateLottoNumbers() {
    return [...Array(6)].map(() => generateRamdomNumbers(45, 10));
  }

  createLottos(prices) {
    this.validCheckAmount(prices);
    const numberLottoPurchases = prices / 1000;

    return [...Array(numberLottoPurchases)].map(
      () => new Lotto(this.generateLottoNumbers())
    );
  }
}

export default LottoMachine;
