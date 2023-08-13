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

  static fromByRandomNumberMaker(count = 1) {
    const lottoNumberMaker = LottoNumberMaker.from();
    return Array.from({ length: count }, () => new Lotto(lottoNumberMaker.createLottoNumbers()));
  }

  static fromLottoByString(string, seperator) {
    return new Lotto(string.split(seperator).map(Number));
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}
