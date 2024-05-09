import { isValidLottoNumberArray } from '../utils/LottoUtil';
import Product from './Product';
import { LOTTO } from '../constants';

class LottoTicket extends Product {
  #lottoNumbers;
  constructor(name = LOTTO.NAME_KR, price = LOTTO.PRICE) {
    super(name, price);
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }

  set lottoNumbers(lottoNumbers) {
    if (!isValidLottoNumberArray(lottoNumbers)) {
      throw new TypeError('올바른 로또 형식이 아닙니다.');
    }
    this.#lottoNumbers = lottoNumbers;
  }
}

export default LottoTicket;
