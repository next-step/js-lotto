import Product from './Product';
import { LOTTO } from '../constants';
import LottoThrowMessage from '../utils/LottoThrowMessage';

class LottoTicket extends Product {
  #lottoNumbers;
  constructor(lottoNumbers, price = LOTTO.PRICE) {
    super(LOTTO.NAME_KR, price);

    new LottoThrowMessage(lottoNumbers).lottoNumberArray();

    this.#lottoNumbers = lottoNumbers;
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default LottoTicket;
