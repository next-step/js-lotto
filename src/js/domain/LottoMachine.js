import { LOTTO_NUMBER_QUANTITY, LOTTO_PRICE } from '../constants/lotto-config.js';
import getRandomNumber from '../utils/getRandomNumber.js';
import checkValidPurchase from '../validator/purchase.js';
import Lotto from './Lotto.js';

class LottoMachine {
  #numberQuantity = LOTTO_NUMBER_QUANTITY;

  #minNumber = 1;

  #maxNumber = 45;

  #pricePerSheet = LOTTO_PRICE;

  buy(money) {
    checkValidPurchase(money);
    const sheetsCount = money / this.#pricePerSheet;
    return Array.from({ length: sheetsCount }, () => new Lotto(this.#makeLottoNumbers()));
  }

  #makeLottoNumbers() {
    const result = new Set();
    while (result.size < this.#numberQuantity) {
      const randomNumber = getRandomNumber(this.#minNumber, this.#maxNumber);
      result.add(randomNumber);
    }
    return [...result];
  }
}

export default LottoMachine;
