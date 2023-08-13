import LottoValidator from '../utils/validate/validator/LottoValidator.js';
import LottoNumberMaker from './LottoNumberMaker.js';

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

  static fromLottoByRandomNumber(count = 1) {
    return Array.from({ length: count }, () => new Lotto(LottoNumberMaker.from().createLottoNumbers()));
  }

  static fromLottoByString(string, seperator) {
    return new Lotto(string.split(seperator).map(Number));
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}
