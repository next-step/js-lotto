import { MIN_NUMBER, MAX_NUMBER, NUMBER_AMOUNT } from '../constants/index.js';

export class LottoTicket {
  lottoNumbers = [];

  constructor() {
    this.randomLottoNumbers();
  }

  randomLottoNumbers() {
    for (let i = 0; i < NUMBER_AMOUNT; i++) {
      const lottoNumber = Math.trunc(
        Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER
      );

      this.lottoNumbers.push(lottoNumber);
    }
  }

  getLottoNumbers() {
    return [...this.lottoNumbers];
  }
}
