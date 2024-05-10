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

  #hasBonusNumber(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusWinningNumber);
  }

  #getMatchLottoNumberCount(lottoNumbers) {
    return this.#winningNumbers.reduce(
      (count, winningNumber) =>
        lottoNumbers.includes(winningNumber) ? count + 1 : count,
      0
    );
  }

  getWinningResult(lottoNumbers) {
    const matchLottoNumber = this.#getMatchLottoNumberCount(lottoNumbers);
    switch (matchLottoNumber) {
      case 6:
        return 1;
      case 5:
        return this.#hasBonusNumber(lottoNumbers) ? 2 : 3;
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return -1;
    }
  }
}

export default LottoMachine;
