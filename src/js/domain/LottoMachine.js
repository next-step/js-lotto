import getRandomNumber from '../utils/getRandomNumber.js';
import Lotto from './Lotto.js';

class LottoMachine {
  #lottoDigit = 6;

  #minNumber = 1;

  #maxNumber = 45;

  static pricePerSheet = 1_000;

  buy(money) {
    const sheetsCount = money / LottoMachine.pricePerSheet;
    return Array.from({ length: sheetsCount }, () => new Lotto(this.#makeLottoNumbers()));
  }

  #makeLottoNumbers() {
    const result = new Set();
    while (result.size < this.#lottoDigit) {
      const randomNumber = getRandomNumber(this.#minNumber, this.#maxNumber);
      result.add(randomNumber);
    }
    return [...result];
  }
}

export default LottoMachine;
