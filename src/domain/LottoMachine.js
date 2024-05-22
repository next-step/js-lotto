import { ErrorLotto } from "../constants/error";
import {
  LOTTO_NUMBER_LENGTH,
  MAX_NUMBER,
  MIN_NUMBER,
} from "../constants/number";
import { randomNumber, shuffle, sortingNumber } from "../util/random";
import Lotto from "./Lotto";
import LottoNumber from "./LottoNumber";

export const LOTTO_PRICE = 1000;

class LottoMachine {
  price = LOTTO_PRICE;
  #lottoNumberPool;

  constructor(price) {
    this.price = price; //빈값인지 숫자인지 에러를 만들

    this.#lottoNumberPool = Array.from(
      { length: MAX_NUMBER },
      (v, i) => new LottoNumber(i + 1)
    );
  }

  #validatePrice(amount) {
    const buyLottoCount = Math.floor(amount / this.price); //정수가 아닐경우,

    if (!buyLottoCount) throw new Error(ErrorLotto.CHECK_AMOUNT_RECEIVE);
    return buyLottoCount;
  }

  #generateRandomLottoNumbers() {
    // const set = new Set();
    // while (set.size < 6) {
    //   const num = randomNumber(MIN_NUMBER, MAX_NUMBER);
    //   set.add(num);
    // }

    // const randomLotto = Array.from(set);
    // return sortingNumber(randomLotto);
    return shuffle(this.#lottoNumberPool).slice(0, 6);
  }

  #generateLottoList(amount) {
    const randomLottoList = Array.from({ length: amount }, () => {
      const randomLottoNumbers = this.#generateRandomLottoNumbers();
      return new Lotto(randomLottoNumbers);
    });
    return randomLottoList;
  }

  buyLottoList(pay) {
    const amount = this.#validatePrice(pay);
    return this.#generateLottoList(amount);
  }
}

export default LottoMachine;
