import Product from './Product';
import { isValidLottoNumberArray } from '../utils/LottoUtil';
import { ERROR_MESSAGE, LOTTO } from '../constants';

class LottoTicket extends Product {
  #lottoNumbers;
  constructor(lottoNumbers, price = LOTTO.PRICE) {
    super(LOTTO.NAME_KR, price);

    if (!isValidLottoNumberArray(lottoNumbers, lottoNumbers.length)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    this.#lottoNumbers = lottoNumbers;
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default LottoTicket;
