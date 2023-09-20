import { isPositiveNumber, isDuplicateArray, shuffleArray, convertStringToNumber } from '../../utils/index.js';
import {
  LOTTO_BALLS,
  ERROR_MESSAGE,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_MODE,
  LOTTO_NUMBER_SEPARATOR,
  LOTTO_NUMBER_LENGTH
} from '../constants/index.js';

class LottoTicket {
  #result = null;
  #lottoNumber = [];
  #mode = LOTTO_MODE.MANUAL;

  constructor(mode, lottoNumber = '') {
    this.#validateLottoMode(mode);
    this.#validateLottoNumber(mode, lottoNumber);

    this.#mode = mode;
    this.#lottoNumber =
      mode === LOTTO_MODE.AUTO
        ? LottoTicket.createLottoNumber()
        : convertStringToNumber(lottoNumber, LOTTO_NUMBER_SEPARATOR);
  }

  static createLottoNumber() {
    return shuffleArray(LOTTO_BALLS).slice(0, LOTTO_NUMBER_LENGTH);
  }

  get mode() {
    return this.#mode;
  }

  get lottoNumber() {
    return this.#lottoNumber;
  }

  get result() {
    return this.#result;
  }

  #validateLottoMode(mode) {
    if (mode !== LOTTO_MODE.AUTO && mode !== LOTTO_MODE.MANUAL) {
      throw ERROR_MESSAGE.INVALID_LOTTO_MODE;
    }
  }

  #validateLottoNumber(mode, lottoNumber) {
    if (mode === LOTTO_MODE.MANUAL) {
      if (!lottoNumber || !lottoNumber.length) {
        throw ERROR_MESSAGE.INVALID_LOTTO_NUMBER_BY_NOT_EXIST;
      }

      const splitLottoNumber =
        typeof lottoNumber === 'string' ? lottoNumber.split(LOTTO_NUMBER_SEPARATOR) : lottoNumber;

      if (splitLottoNumber.length !== LOTTO_NUMBER_LENGTH) {
        throw ERROR_MESSAGE.INVALID_LOTTO_NUMBER_BY_NOT_ENOUGH_LENGTH;
      }

      if (splitLottoNumber.every((number) => !isPositiveNumber(number))) {
        throw ERROR_MESSAGE.INVALID_LOTTO_NUMBER_BY_NOT_POSITIVE_NUMBER;
      }

      if (!splitLottoNumber.every((number) => number >= LOTTO_MIN_NUMBER && number <= LOTTO_MAX_NUMBER)) {
        throw ERROR_MESSAGE.INVALID_LOTTO_NUMBER_BY_RANGE;
      }

      if (isDuplicateArray(splitLottoNumber)) {
        throw ERROR_MESSAGE.INVALID_LOTTO_NUMBER_BY_DUPLICATE;
      }
    }
  }

  setResult(result) {
    this.#result = result;
  }
}

export default LottoTicket;
