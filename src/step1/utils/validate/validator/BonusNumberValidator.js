import { ERROR_MESSAGE } from '../../../constants/message.js';
import { BonusNumberError } from '../../../errors/index.js';
import { isValidTypeOfNumber } from '../common/number.js';
import { isDuplicateLottoNumber, isValidLottoNumberRange } from '../lotto/lottoValidate.js';

const BonusNumberValidator = {
  validateDuplicateBonusNumber(lottoNumbers, bonusNumber) {
    if (isDuplicateLottoNumber(lottoNumbers, bonusNumber)) {
      throw new BonusNumberError(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
    }
  },
  validateBonusNumberInRange(bonusNumber) {
    if (!isValidLottoNumberRange(bonusNumber)) {
      throw new BonusNumberError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    }
  },
  validateBonusNumberType(bonusNumber) {
    if (!isValidTypeOfNumber(bonusNumber)) {
      throw new BonusNumberError(ERROR_MESSAGE.TYPE_OF_NUMBER);
    }
  },
};

export default BonusNumberValidator;
