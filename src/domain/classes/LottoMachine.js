import {
  ERROR_MESSAGE,
  LOTTO_NUMBER_SEPARATOR,
  LOTTO_NUMBER_LENGTH,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER
} from '../constants/index';
import { isDuplicateArray, isTruthyArray, convertStringToNumber } from '../../utils/index';

class LottoMachine {
  #winningLottoNumber = [];
  #bonusNumber = 0;

  constructor(winningLottoNumber, bonusNumber) {
    this.#validateWinningLottoNumber(winningLottoNumber);
    this.#winningLottoNumber = convertStringToNumber(winningLottoNumber, LOTTO_NUMBER_SEPARATOR);

    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = Number(bonusNumber);
  }

  get winningLottoNumber() {
    return this.#winningLottoNumber;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  #validateWinningLottoNumber(winningLottoNumber) {
    const splitWinningLottoNumber = winningLottoNumber.split(LOTTO_NUMBER_SEPARATOR);

    if (!isTruthyArray(splitWinningLottoNumber) || splitWinningLottoNumber.length !== LOTTO_NUMBER_LENGTH) {
      throw ERROR_MESSAGE.INVALID_WINNING_LOTTO_NUMBER;
    }

    if (!splitWinningLottoNumber.every((number) => number >= LOTTO_MIN_NUMBER && number <= LOTTO_MAX_NUMBER)) {
      throw ERROR_MESSAGE.INVALID_WINNING_LOTTO_NUMBER_BY_RANGE;
    }

    if (isDuplicateArray(splitWinningLottoNumber)) {
      throw ERROR_MESSAGE.INVALID_WINNING_LOTTO_NUMBER_BY_DUPLICATE;
    }
  }

  #validateBonusNumber(bonusNumber) {
    const numericBonusNumber = Number(bonusNumber);

    if (!(numericBonusNumber >= LOTTO_MIN_NUMBER && numericBonusNumber <= LOTTO_MAX_NUMBER)) {
      throw ERROR_MESSAGE.INVALID_BONUS_NUMBER_BY_RANGE;
    }

    if (this.#winningLottoNumber.includes(Number(numericBonusNumber))) {
      throw ERROR_MESSAGE.INVALID_BONUS_NUMBER_BY_DUPLICATE;
    }
  }
}

export default LottoMachine;
