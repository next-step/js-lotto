import Product from './Product';
import { isValidLottoNumberArray } from '../utils/LottoUtil';
import { ERROR_MESSAGE, LOTTO } from '../constants';

class LottoTicket extends Product {
  #lottoNumbers;
  constructor(name = LOTTO.NAME_KR, price = LOTTO.PRICE) {
    super(name, price);
    this.#lottoNumbers = [];
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }

  set lottoNumbers(lottoNumbers) {
    if (!isValidLottoNumberArray(lottoNumbers)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    this.#lottoNumbers = lottoNumbers;
  }
}

export default LottoTicket;
