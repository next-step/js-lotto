import { ERROR_MESSAGE } from '../../../constants/message.js';
import { BonusNumberError } from '../../../errors/index.js';
import { isValidTypeOfNumber } from '../common/number.js';
import { isDuplicateLottoNumber, isValidLottoNumberRange } from '../lotto/lottoValidate.js';

const throwIfInvalid = (condition, errorMessage) => {
  if (condition) {
    throw new BonusNumberError(errorMessage);
  }
};

const BonusNumberValidator = {
  validateDuplicateBonusNumber(lottoNumbers, bonusNumber) {
    throwIfInvalid(isDuplicateLottoNumber(lottoNumbers, bonusNumber), ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
  },
  validateBonusNumberInRange(bonusNumber) {
    throwIfInvalid(!isValidLottoNumberRange(bonusNumber), ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
  },
  validateBonusNumberType(bonusNumber) {
    throwIfInvalid(!isValidTypeOfNumber(bonusNumber), ERROR_MESSAGE.TYPE_OF_NUMBER);
  },
};

export default BonusNumberValidator;
