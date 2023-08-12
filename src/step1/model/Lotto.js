import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/lotto.js';
import { RandomNumberGenerator } from '../utils/generator/index.js';
import LottoValidator from '../utils/validate/validator/LottoValidator.js';

export default class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#validate(lottoNumbers);
    this.#lottoNumbers = lottoNumbers;
  }

  #validate(lottoNumbers) {
    LottoValidator.validateTypeOfNumbers(lottoNumbers);
    LottoValidator.validateDefaultLottoCount(lottoNumbers);
    LottoValidator.validateDuplicateLottoNumbers(lottoNumbers);
    LottoValidator.validateLottoNumbersInRange(lottoNumbers);
  }

  static fromLottoByRandomNumber(
    { randomNumberMaker = RandomNumberGenerator, count = 1 } = {
      randomNumberMaker: RandomNumberGenerator,
      count: 1,
    },
  ) {
    return Array(count)
      .fill(null)
      .map(() => {
        const randomNumbers = randomNumberMaker.pickNumbersInRange({
          startNumber: MIN_LOTTO_NUMBER,
          endNumber: MAX_LOTTO_NUMBER,
          count: DEFAULT_LIMIT_LOTTO_COUNT,
        });
        return new Lotto(randomNumbers);
      });
  }

  static fromLottoByString(string, seperator) {
    return new Lotto(string.split(seperator).map(Number));
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}
