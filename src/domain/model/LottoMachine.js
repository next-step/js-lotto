import { LottoView } from '../view/LottoView.js';

export class LottoMachine {
  constructor(count) {
    this.view = LottoView;
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
    this.view.LOTTO_NUMBERS(lottoNumbers);
    return lottoNumbers;
  }
}
