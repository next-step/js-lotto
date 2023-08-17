import { isPositiveNumber } from '.';
import { MESSAGE, STRING, NUMBER } from '../../constants';
import { isNumbersUnique, isLottoNumber } from './common';

/* View */
export const View = {
  readUserInput(value) {
    if (value === STRING.EMPTY) throw new Error(MESSAGE.ERROR.EMPTY_STRING);
  },

  readPurchaseAmount(value) {
    if (!isPositiveNumber(value))
      throw new Error(MESSAGE.ERROR.IS_NOT_POSITIVE_NUMBER);
  },

  readLottoNumbers(lottoNumbers) {
    // 로또는 6자리 수이다.
    const lottoLength = NUMBER.LOTTO_TICKET.NUMBERS_LENGTH;
    if (lottoNumbers.length !== lottoLength)
      throw new Error(MESSAGE.ERROR.INVALID_LOTTO_LENGTH(lottoLength));

    // 로또 번호는 1 - 43 사이의 수이다.
    const { MIN_RANGE, MAX_RANGE } = NUMBER.LOTTO_TICKET;
    lottoNumbers.forEach((lottoNumber) => {
      if (!isLottoNumber(lottoNumber))
        throw new Error(
          MESSAGE.ERROR.INVALID_LOTTO_RANGE(MIN_RANGE, MAX_RANGE)
        );
    });

    // 로또 번호는 중복될 수 없다.
    if (!isNumbersUnique(lottoNumbers))
      throw new Error(MESSAGE.ERROR.DUPLICATE_LOTTO_NUMBERS);
  },

  readBonusNumber(bonusNumber, lottoNumbers) {
    const { MIN_RANGE, MAX_RANGE } = NUMBER.LOTTO_TICKET;

    if (!isLottoNumber(bonusNumber))
      throw new Error(
        MESSAGE.ERROR.INVALID_BONUS_NUMBER_RANGE(MIN_RANGE, MAX_RANGE)
      );

    if (lottoNumbers.includes(Number(bonusNumber)))
      throw new Error(MESSAGE.ERROR.DUPLICATE_BONUS_NUMBER);
  },
  readRestart(restartInput) {
    if (
      restartInput !== STRING.RESTART_INPUT.YES &&
      restartInput !== STRING.RESTART_INPUT.NO
    ) {
      throw new Error(MESSAGE.ERROR.INVALID_RESTART_INPUT);
    }
  },
};
