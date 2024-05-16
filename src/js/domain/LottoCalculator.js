import { ERROR_MESSAGE } from '../constants';
import {
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../utils/LottoUtil';

class LottoCalculator {
  #winningNumbers;
  #bonusWinningNumber;

  static DUPLICATE_LOTTO_NUMBERS = '중복된 로또 번호 입니다.';

  constructor(winningNumbers, bonusWinningNumber) {
    if (!isValidLottoNumberArray(winningNumbers)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (!isValidLottoNumber(bonusWinningNumber)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (winningNumbers.includes(bonusWinningNumber)) {
      throw new TypeError(LottoCalculator.DUPLICATE_LOTTO_NUMBERS);
    }
    this.#winningNumbers = winningNumbers;
    this.#bonusWinningNumber = bonusWinningNumber;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get bonusWinningNumber() {
    return this.#bonusWinningNumber;
  }
}

export default LottoCalculator;
