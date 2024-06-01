import { ErrorLotto } from "../constants/error";

import { shuffle } from "../util/random";
import Lotto from "./Lotto";
import LottoPool from "./LottoPool";

export const LOTTO_PRICE = 1000;

class LottoMachine {
  price = LOTTO_PRICE;
  #lottoNumberPool = LottoPool.lottoNumberPool;

  constructor(price) {
    this.price = price; //빈값인지 숫자인지 에러를 만들
  }

  #validatePrice(amount) {
    const buyLottoCount = Math.floor(amount / this.price); //정수가 아닐경우,

    if (!buyLottoCount) throw new Error(ErrorLotto.CHECK_AMOUNT_RECEIVE);
    return buyLottoCount;
  }

  #generateRandomLottoNumbers() {
    return shuffle(this.#lottoNumberPool).slice(0, 6);
  }

  #generateLottoList(amount) {
    return Array.from({ length: amount }, () => {
      const randomLottoNumbers = this.#generateRandomLottoNumbers();
      return new Lotto(randomLottoNumbers);
    });
  }

  buyLottoList(pay) {
    const amount = this.#validatePrice(pay.money);
    return this.#generateLottoList(amount);
  }
}

export default LottoMachine;
