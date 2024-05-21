import ThrowMessage from './ThrowMessage';
import { isValidLottoNumber, isValidLottoNumberArray } from './LottoUtil';
import { ERROR_MESSAGE } from '../constants';

class LottoThrowMessage extends ThrowMessage {
  constructor(value) {
    super(value);
  }

  isValidLottoNumberArray() {
    if (!isValidLottoNumberArray(super.value, super.value.length)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_LOTTO_FORMAT);
    }
    return this;
  }

  isValidLottoNumber() {
    if (!isValidLottoNumber(super.value)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_LOTTO_FORMAT);
    }
    return this;
  }

  checkDuplicateLottoNumbers(lottoNumbers) {
    if (lottoNumbers.includes(super.value)) {
      throw new TypeError(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
    }
    return this;
  }

  checkCost(cost) {
    if (super.value < cost) {
      throw new Error(`${cost}보다 ${ERROR_MESSAGE.NOT_ENOUGH_MONEY}`);
    }
    return this;
  }
}

export default LottoThrowMessage;
