import { PRICE_PER_LOTTO } from '../constants/lotto.js';
import { ERROR_MESSAGE } from '../constants/message.js';
import { LottoError } from '../errors/index.js';
import { isValidTypeOfNumber } from '../utils/validate/common/number.js';
import { isLessThenPricePerLotto } from '../utils/validate/lotto/lottoValidate.js';
import { Lotto } from './index.js';

export default class LottoMerchant {
  #receivedAmount;

  constructor(receivedAmount) {
    this.#validate(receivedAmount);
    this.#receivedAmount = receivedAmount;
  }

  static fromLottoMerchantForPay(receivedAmount) {
    return new LottoMerchant(receivedAmount);
  }

  #validate(receivedAmount) {
    if (!isValidTypeOfNumber(receivedAmount)) {
      throw new LottoError(ERROR_MESSAGE.TYPE_OF_NUMBER);
    }
    if (isLessThenPricePerLotto(receivedAmount)) {
      throw new LottoError(ERROR_MESSAGE.GREATER_THEN_PRICE_PER_LOTTO);
    }
    if (receivedAmount % PRICE_PER_LOTTO > 0) {
      throw new LottoError(ERROR_MESSAGE.NO_CHANGES);
    }
  }

  #createLottoCount() {
    return Math.floor(this.#receivedAmount / PRICE_PER_LOTTO);
  }

  sellLotto() {
    return Lotto.fromLottoByRandomNumber({ count: this.#createLottoCount() });
  }
}
