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
    if (lottoNumbers.length !== NUMBER.LOTTO_TICKET.NUMBERS_LENGTH)
      throw new Error(
        `로또는 ${NUMBER.LOTTO_TICKET.NUMBERS_LENGTH}자리 숫자입니다.`
      );

    // 로또 번호는 1 - 43 사이의 수이다.
    lottoNumbers.forEach((lottoNumber) => {
      if (!isLottoNumber(lottoNumber))
        throw new Error(
          `로또 번호는 ${NUMBER.LOTTO_TICKET.MIN_RANGE}~${NUMBER.LOTTO_TICKET.MAX_RANGE} 사이의 숫자만 가능합니다.`
        );
    });

    // 로또 번호는 중복될 수 없다.
    if (!isNumbersUnique(lottoNumbers))
      throw new Error('로또 번호에 중복된 숫자가 있습니다.');
  },

  readBonusNumber(bonusNumber, lottoNumbers) {
    if (!isLottoNumber(bonusNumber))
      throw new Error(
        `보너스 번호는 ${NUMBER.LOTTO_TICKET.MIN_RANGE}~${NUMBER.LOTTO_TICKET.MAX_RANGE} 사이의 숫자만 가능합니다.`
      );

    if (lottoNumbers.includes(Number(bonusNumber)))
      throw new Error('보너스 번호는 로또 번호와 중복될 수 없습니다.');
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
