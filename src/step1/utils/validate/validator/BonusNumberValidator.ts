import { ERROR_MESSAGE } from '@step1/constants/message';
import { BonusNumberError } from '@step1/errors/index';
import { isValidTypeOfNumber } from '@step1/utils/validate/common/number';
import { isDuplicateLottoNumber, isValidLottoNumberRange } from '@step1/utils/validate/lotto/lottoValidate';

const throwIfInvalid = (condition: boolean, errorMessage: string) => {
  if (condition) {
    throw new BonusNumberError(errorMessage);
  }
};

const BonusNumberValidator = {
  validateDuplicateBonusNumber(lottoNumbers: number[], bonusNumber: number) {
    throwIfInvalid(isDuplicateLottoNumber(lottoNumbers, bonusNumber), ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
  },
  validateBonusNumberInRange(bonusNumber: number) {
    throwIfInvalid(!isValidLottoNumberRange(bonusNumber), ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
  },
  validateBonusNumberType(bonusNumber: number) {
    throwIfInvalid(!isValidTypeOfNumber(bonusNumber), ERROR_MESSAGE.TYPE_OF_NUMBER);
  },
};

export default BonusNumberValidator;
