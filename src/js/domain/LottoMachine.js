import { LOTTO_NUMBER_QUANTITY, LOTTO_NUMBER_RANGE, LOTTO_PRICE } from '../constants/lotto-config.js';
import getRandomNumber from '../utils/getRandomNumber.js';
import Lotto from './Lotto.js';

class LottoMachine {
  #numberQuantity = LOTTO_NUMBER_QUANTITY;

  #minNumber = LOTTO_NUMBER_RANGE.MIN;

  #maxNumber = LOTTO_NUMBER_RANGE.MAX;

  #pricePerSheet = LOTTO_PRICE;

  buy(money) {
    const sheetsCount = money / this.#pricePerSheet;
    return Array.from({ length: sheetsCount }, () => new Lotto(this.#makeLottoNumbers()));
  }

  #makeLottoNumbers() {
    const result = new Set();
    while (result.size < this.#numberQuantity) {
      const randomNumber = getRandomNumber(this.#minNumber, this.#maxNumber);
      result.add(randomNumber);
    }
    return [...result].sort((a, b) => a - b);
  }
}

export default LottoMachine;
