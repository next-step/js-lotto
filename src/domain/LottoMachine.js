import { ErrorLotto } from "../constants/error";
import { MAX_NUMBER, MIN_NUMBER } from "../constants/number";
import { randomNumber, sortingNumber } from "../util/random";

const LOTTO_PRICE = 1000;

class LottoMachine {
  price = LOTTO_PRICE;
  #amount = 0;
  #number = [];

  constructor(amountReceive) {
    this.#amount = this.#validatePrice(amountReceive);

    this.#generateLottoNumber();
  }

  #validatePrice(amount) {
    const buyLottoCount = Math.floor(amount / LOTTO_PRICE); //정수가 아닐경우,

    if (!buyLottoCount) throw new Error(ErrorLotto.CHECK_AMOUNT_RECEIVE);
    return buyLottoCount;
  }

  #generateRandomNumber() {
    const set = new Set();
    while (set.size < 6) {
      const num = randomNumber(MIN_NUMBER, MAX_NUMBER);
      set.add(num);
    }

    const randomLotto = Array.from(set);
    return sortingNumber(randomLotto);
  }

  #generateLottoNumber() {
    const randomLottoNumber = Array.from({ length: this.#amount }, () =>
      this.#generateRandomNumber()
    );

    this.#number = randomLottoNumber;
  }

  get amount() {
    return this.#amount;
  }

  get number() {
    return this.#number;
  }
}

export default LottoMachine;
