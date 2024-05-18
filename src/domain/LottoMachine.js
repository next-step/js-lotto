
import {
  LOTTO_MAX_NUMBER,
  LOTTO_PRICE,
  LOTTO_TOTAL_COUNT,
  RADIX_INTEGER,
} from '../constants';
import { generateRandomNumbers } from '../utils';
import LottoValidator from './LottoValidator';

class LottoMachine {
  #lottos;

  constructor() {
    this.#lottos = [];
    this.validators = new LottoValidator();
  }

  createLottos(inputPrices, order, sortArray) {
    this.validators.validCheckAmount(inputPrices);
    const numberLottoPurchases = Math.floor(inputPrices / LOTTO_PRICE);

    const newLottos = Array.from({ length: numberLottoPurchases }, () => {
      const lottoNumbers = this.generateLottoNumbers(this.validators);
      const sortNumbers = sortArray(order, lottoNumbers);
      this.#lottos.push(sortNumbers);
      return sortNumbers;
    });

    return newLottos;
  }

  generateLottoNumbers(validator) {

    const lottoNumbers = [];

    while (lottoNumbers.length !== LOTTO_TOTAL_COUNT) {
      const number = generateRandomNumbers(LOTTO_MAX_NUMBER, RADIX_INTEGER);
      if (!lottoNumbers.includes(number)) {
        lottoNumbers.push(number);
      }
    }
    validator.validLottoLength(lottoNumbers);
    return lottoNumbers;
  }

}

export default LottoMachine;
