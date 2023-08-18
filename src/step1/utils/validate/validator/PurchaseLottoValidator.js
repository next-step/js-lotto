import { LOTTO_TERMS } from '../../../constants/lotto.js';
import { ERROR_MESSAGE } from '../../../constants/message.js';
import { PurchaseLottoError } from '../../../errors/index.js';
import { isValidTypeOfNumber } from '../common/number.js';
import { isLessThenPricePerLotto } from '../lotto/lottoValidate';

const throwIfInvalid = (condition, errorMessage) => {
  if (condition) {
    throw new PurchaseLottoError(errorMessage);
  }
};

const PurchaseLottoValidator = {
  validateTypeOfNumber(receivedAmount) {
    throwIfInvalid(!isValidTypeOfNumber(receivedAmount), ERROR_MESSAGE.TYPE_OF_NUMBER);
  },
  validateLessThanPricePerLotto(receivedAmount) {
    throwIfInvalid(isLessThenPricePerLotto(receivedAmount), ERROR_MESSAGE.GREATER_THEN_PRICE_PER_LOTTO);
  },
  validateChangeFromReceivedAmount(receivedAmount) {
    throwIfInvalid(receivedAmount % LOTTO_TERMS.PRICE_PER_LOTTO !== 0, ERROR_MESSAGE.NO_CHANGES);
  },
};

export default PurchaseLottoValidator;
