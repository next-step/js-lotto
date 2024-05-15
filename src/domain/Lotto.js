import { MAX_NUMBER, MIN_NUMBER } from "../constants/number";
import { randomNumber, sortingNumber } from "../util/random";

class Lotto {
  price = 1000;
  number = [];

  constructor() {
    this.#generateLottoNumber();
  }

  #generateLottoNumber() {
    const set = new Set();
    while (set.size < 6) {
      const num = randomNumber(MIN_NUMBER, MAX_NUMBER);
      set.add(num);
    }

    const randomLotto = Array.from(set);
    this.number = sortingNumber(randomLotto);
  }
}

export default Lotto;
