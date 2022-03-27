import { MIN_NUMBER, MAX_NUMBER, NUMBER_AMOUNT } from '../constants/index.js';

export class LottoTicket {
  lottoNumbers = new Map();

  constructor() {
    this.issueLottoNumbers();
  }

  issueLottoNumbers() {
    while (this.lottoNumbers.size < NUMBER_AMOUNT) {
      const lottoNumber = this.randomLottoNumber();

      if (this.lottoNumbers.has(lottoNumber)) continue;
      else this.lottoNumbers.set(lottoNumber, true);
    }
  }

  randomLottoNumber() {
    return Math.trunc(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
  }

  getLottoNumbers() {
    return Array.from(this.lottoNumbers.entries()).map(([number]) => number);
  }
}
