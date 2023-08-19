import {validateOnlyNumber} from '../utils';

export const VALIDATE_BONUS_NUMBER_ERROR = {
  NOT_IN_RANGE: '1~45사이의 숫자를 입력해주세요.',
  DUPLICATED_WINNING_NUMBER: '당첨 번호와 중복되지 않는 숫자를 입력해주세요.',
};
export const validateBonusNumber = (text, winningNumbers) => {
  validateOnlyNumber(text);

  const bonusNumber = Number(text);

  if (bonusNumber < 1 || bonusNumber > 45) {
    throw new Error(VALIDATE_BONUS_NUMBER_ERROR.NOT_IN_RANGE);
  }

  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(VALIDATE_BONUS_NUMBER_ERROR.DUPLICATED_WINNING_NUMBER);
  }
};
