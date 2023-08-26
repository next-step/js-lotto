import { LOTTO_NUMBERS_LENGTH } from '../constants/lotto.js';
import { getRandomNumber } from '../utils/number.js';

export class LottoNumberGenerator {
  static generateNumber() {
    const numbers = [];

    while (numbers.length < LOTTO_NUMBERS_LENGTH) {
      const randomNumber = getRandomNumber(1, 45);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    return numbers.sort((a, b) => a - b);
  }
}
