import ThrowMessage from './ThrowMessage';
import { isValidLottoNumber, isValidLottoNumberArray } from './LottoUtil';
import { ERROR_MESSAGE } from '../constants';

class LottoThrowMessage extends ThrowMessage {
  constructor(value) {
    super(value);
  }

  isValidLottoNumberArray() {
    if (!isValidLottoNumberArray(super.value, super.value.length)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    return this;
  }

  isValidLottoNumber() {
    if (!isValidLottoNumber(super.value)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    return this;
  }

  checkDuplicateLottoNumbers(lottoNumbers) {
    if (lottoNumbers.includes(super.value)) {
      throw new TypeError('중복된 로또번호');
    }
    return this;
  }

  checkCost(cost) {
    if (super.value < cost) {
      throw new Error("'돈이 부족합니다.'");
    }
    return this;
  }
}

export default LottoThrowMessage;
