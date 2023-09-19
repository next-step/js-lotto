import { isPositiveNumber } from '.';
import { MESSAGE, RESTART_INPUT, NUMBER } from '../../constants';
import { isLottoNumber, isNumbersUnique } from './';

const EMPTY_INPUT = '';

/* View */
export const View = {
  readUserInput(value) {
    if (value === EMPTY_INPUT) throw new Error(MESSAGE.ERROR.EMPTY_STRING);
  },

  readPurchaseAmount(value) {
    if (!isPositiveNumber(value)) {
      throw new Error(MESSAGE.ERROR.IS_NOT_POSITIVE_NUMBER);
    }
  },

  readLottoNumbers(lottoNumbers) {
    if (lottoNumbers.some((value) => value === EMPTY_INPUT)) {
      throw new Error(MESSAGE.READ.LOTTO_NUMBERS);
    }
    // 로또는 6자리 수이다.
    const lottoLength = NUMBER.LOTTO_TICKET.NUMBERS_LENGTH;
    if (lottoNumbers.length !== lottoLength) {
      throw new Error(MESSAGE.ERROR.INVALID_LOTTO_LENGTH(lottoLength));
    }
    // 로또 번호는 1 - 43 사이의 수이다.
    const { MIN_RANGE, MAX_RANGE } = NUMBER.LOTTO_TICKET;
    const isValidNumbers = lottoNumbers.every(isLottoNumber);
    if (!isValidNumbers) {
      throw new Error(MESSAGE.ERROR.INVALID_LOTTO_RANGE(MIN_RANGE, MAX_RANGE));
    }
    // 로또 번호는 중복될 수 없다.
    if (!isNumbersUnique(lottoNumbers)) {
      throw new Error(MESSAGE.ERROR.DUPLICATE_LOTTO_NUMBERS);
    }
  },

  readBonusNumber(bonusNumber, lottoNumbers) {
    if (bonusNumber === EMPTY_INPUT) throw new Error(MESSAGE.READ.BONUS_NUMBER);

    const { MIN_RANGE, MAX_RANGE } = NUMBER.LOTTO_TICKET;

    if (!isLottoNumber(bonusNumber)) {
      throw new Error(
        MESSAGE.ERROR.INVALID_BONUS_NUMBER_RANGE(MIN_RANGE, MAX_RANGE)
      );
    }
    if (lottoNumbers.includes(Number(bonusNumber))) {
      throw new Error(MESSAGE.ERROR.DUPLICATE_BONUS_NUMBER);
    }
  },

  readRestart(restartInput) {
    if (
      restartInput !== RESTART_INPUT.YES &&
      restartInput !== RESTART_INPUT.NO
    ) {
      throw new Error(MESSAGE.ERROR.INVALID_RESTART_INPUT);
    }
  },
};
