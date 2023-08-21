import { LottoOutput } from '../view/LottoOutput.js';

export class LottoMachine {
  constructor(count) {
    this.output = LottoOutput;
    this.lottos = Array.from({ length: count }, () => this.issueLotto());
  }

  issueLotto() {
    let lottoNumbers = [];
    while (lottoNumbers.length < 6) {
      let number = Math.floor(Math.random() * 45) + 1;
      if (!lottoNumbers.includes(number)) {
        lottoNumbers.push(number);
      }
    }
    this.output.LOTTO_NUMBERS(lottoNumbers);
    return lottoNumbers;
  }
}
