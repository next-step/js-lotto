import { isValidLottoNumberArray } from '../utils/LottoUtil';

class LottoTicket {
  #lottoNumbers;
  constructor(lottoNumbers) {
    if (!isValidLottoNumberArray(lottoNumbers)) {
      throw new TypeError('올바른 로또 형식이 아닙니다.');
    }
    this.#lottoNumbers = lottoNumbers;
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default LottoTicket;
