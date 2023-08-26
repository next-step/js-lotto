import { LOTTO_PRICE, WINNING_NUMBER } from '../constants/index.js';

export class Machine {
  constructor() {
    this.lottos = [];
    this.lottoCount = 0;
  }

  insertMoney(money) {
    this.lottoCount = Math.floor(money / LOTTO_PRICE);
    this.lottos = Array.from({ length: this.lottoCount }).map(() => this.issueLotto());
  }

  issueLotto() {
    let lottoNumbers = [];
    while (lottoNumbers.length < WINNING_NUMBER.COUNT) {
      let number = Math.floor(Math.random() * WINNING_NUMBER.MAX) + WINNING_NUMBER.MIN;
      if (!lottoNumbers.includes(number)) {
        lottoNumbers.push(number);
      }
    }
    return lottoNumbers;
  }
}
