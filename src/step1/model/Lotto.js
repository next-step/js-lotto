import LottoNumberMaker from '../utils/LottoMaker.js';
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
    { randomNumberMaker = LottoNumberMaker, count = 1 } = {
      randomNumberMaker: LottoNumberMaker,
      count: 1,
    },
  ) {
    return Array(count)
      .fill(null)
      .map(() => {
        const randomNumbers = randomNumberMaker.createNumbers();
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
