import { LOTTO } from '../constants';
import {
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../utils/LottoUtil';

class LottoMachine {
  #winningNumbers;
  #bonusWinningNumber;

  constructor() {
    this.#winningNumbers = Array.from({
      length: LOTTO.WINNING_NUMBER_LENGTH,
    }).fill(null);
    this.#bonusWinningNumber = null;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  set winningNumbers(winningNumbers) {
    if (!isValidLottoNumberArray(winningNumbers)) {
      throw new TypeError('유효하지 않은 값 입니다.');
    }
    this.#winningNumbers = winningNumbers;
  }

  get bonusWinningNumber() {
    return this.#bonusWinningNumber;
  }

  set bonusWinningNumber(bonusWinningNumber) {
    if (!isValidLottoNumberArray(this.#winningNumbers)) {
      throw new TypeError('로또 번호가 먼저 생성되어야 합니다.');
    }
    if (!isValidLottoNumber(bonusWinningNumber)) {
      throw new TypeError('유효하지 않은 값 입니다.');
    }
    if (this.#winningNumbers.includes(bonusWinningNumber)) {
      throw new TypeError(
        '로또 번호와 같은 번호는 보너스번호가 될 수 없습니다.'
      );
    }
    this.#bonusWinningNumber = bonusWinningNumber;
  }

  getWinningResult(lottoNumbers) {
    const matchNumber = this.#winningNumbers.filter((winningNumber) =>
      lottoNumbers.includes(winningNumber)
    ).length;
    if (matchNumber === 6) {
      return 1;
    }
    if (matchNumber === 5 && lottoNumbers.includes(this.#bonusWinningNumber)) {
      return 2;
    }
    if (matchNumber === 5) {
      return 3;
    }
    if (matchNumber === 4) {
      return 4;
    }
    if (matchNumber === 3) {
      return 5;
    }
    return -1;
  }
}

export default LottoMachine;
