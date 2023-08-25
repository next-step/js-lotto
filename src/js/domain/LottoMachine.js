import ERROR from '../constants/error.js';
import { shuffle } from '../utils/index.js';
import { Lotto } from './Lotto.js';
import { LottoNumber } from './LottoNumber.js';

export class LottoMachine {
  #balls;

  constructor() {
    this.#addBalls();
    this.#shuffle();
  }

  buy(money) {
    LottoMachine.#validate(money);
    const sheets = LottoMachine.#calculateSheet(money);
    const lottos = Array.from({ length: sheets }).map(() => {
      const result = new Lotto(this.#pickBalls());
      this.#addBalls();
      this.#shuffle();
      return result;
    });
    return lottos;
  }

  static #validate(money) {
    if (money % Lotto.PRICE !== 0 || money <= 0) {
      throw new Error(ERROR.UNMATCHED_PRICE_PER_SHEET(Lotto.PRICE));
    }
  }

  static #calculateSheet(money) {
    return money / Lotto.PRICE;
  }

  #addBalls() {
    this.#balls = Array.from({ length: LottoNumber.MAX }, (_, i) => i + 1);
  }

  #shuffle() {
    this.#balls = shuffle(this.#balls);
  }

  #pickBalls() {
    return this.#balls.slice(0, Lotto.NUMBER_QUANTITY);
  }
}
