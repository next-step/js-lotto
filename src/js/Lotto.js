import { LOTTO } from './utils/constants.js';

export default class Lotto {
  lottoNumbers = [];
  constructor() {
    this.lottoNumbers = this.setLottoNumbers();
  }

  setLottoNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length !== LOTTO.LENGTH) {
      const randomNumber = Math.floor(
        Math.random() * (LOTTO.MAX_VALUE - LOTTO.MIN_VALUE) + LOTTO.MIN_VALUE
      );
      if (!lottoNumbers.includes(randomNumber)) {
        lottoNumbers.push(randomNumber);
      }
    }
    return lottoNumbers;
  }

  getLottoNumbers() {
    return this.lottoNumbers;
  }
}
