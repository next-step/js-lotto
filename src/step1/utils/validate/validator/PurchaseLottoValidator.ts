import { LOTTO_TERMS } from '../../../constants/lotto';
import { ERROR_MESSAGE } from '../../../constants/message';
import { PurchaseLottoError } from '../../../errors/index';
import { isValidTypeOfNumber } from '../common/number';
import { isLessThenPricePerLotto } from '../lotto/lottoValidate';

const throwIfInvalid = (condition: boolean, errorMessage: string) => {
  if (condition) {
    throw new PurchaseLottoError(errorMessage);
  }
};

const PurchaseLottoValidator = {
  validateTypeOfNumber(receivedAmount: number) {
    throwIfInvalid(!isValidTypeOfNumber(receivedAmount), ERROR_MESSAGE.TYPE_OF_NUMBER);
  },
  validateLessThanPricePerLotto(receivedAmount: number) {
    throwIfInvalid(isLessThenPricePerLotto(receivedAmount), ERROR_MESSAGE.GREATER_THEN_PRICE_PER_LOTTO);
  },
  validateChangeFromReceivedAmount(receivedAmount: number) {
    throwIfInvalid(receivedAmount % LOTTO_TERMS.PRICE_PER_LOTTO !== 0, ERROR_MESSAGE.NO_CHANGES);
  },
};

export default PurchaseLottoValidator;
