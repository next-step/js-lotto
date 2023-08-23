import Lotto from './Lotto.js';
import { LottoNumber } from './LottoNumber.js';

class LottoMachine {
  static LOTTO_NUMBER_QUANTITY = 6;

  static PRICE = 1_000;

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
    if (money % LottoMachine.PRICE !== 0 || money <= 0) {
      throw new Error(`${LottoMachine.PRICE}원 단위의 금액을 입력해주세요!`);
    }
  }

  static #calculateSheet(money) {
    return money / LottoMachine.PRICE;
  }

  #addBalls() {
    this.#balls = Array.from({ length: LottoNumber.MAX }, (_, i) => i + 1);
  }

  #shuffle() {
    this.#balls = this.#balls.sort(() => 0.5 - Math.random());
  }

  #pickBalls() {
    return this.#balls.slice(0, LottoMachine.LOTTO_NUMBER_QUANTITY);
  }
}

export default LottoMachine;
