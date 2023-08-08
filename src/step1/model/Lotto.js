import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/lotto.js';
import { RandomNumberGenerator } from '../utils/generator/index.js';

export default class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
  }

  static createLottoByRandomNumber(count = 1) {
    return Array(count)
      .fill(0)
      .map(() => {
        const randomNumbers = RandomNumberGenerator.pickNumbersInRange({
          startNumber: MIN_LOTTO_NUMBER,
          endNumber: MAX_LOTTO_NUMBER,
          count: DEFAULT_LIMIT_LOTTO_COUNT,
        });
        return new Lotto(randomNumbers);
      });
  }

  static createLottoByString(string, seperator) {
    return new Lotto(string.split(seperator));
  }
}
