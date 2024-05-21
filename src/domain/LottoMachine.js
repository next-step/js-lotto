import { ErrorLotto } from "../constants/error";
import { MAX_NUMBER, MIN_NUMBER } from "../constants/number";
import { randomNumber, sortingNumber } from "../util/random";
import Lotto from "./Lotto";

export const LOTTO_PRICE = 1000;

class LottoMachine {
  price = LOTTO_PRICE;

  constructor(price) {
    this.price = price;
  }

  #validatePrice(amount) {
    const buyLottoCount = Math.floor(amount / this.price); //정수가 아닐경우,

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

  #generateLottoList(amount) {
    const randomLottoList = Array.from({ length: amount }, () =>
      this.#generateRandomNumber()
    );
    return randomLottoList.map((lotto) => new Lotto(lotto).number);
  }

  buyLottoList(pay) {
    const amount = this.#validatePrice(pay);
    return this.#generateLottoList(amount);
  }
}

export default LottoMachine;
