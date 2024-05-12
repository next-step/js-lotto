import { LOTTO, MESSAGE } from "../constant";
import { generateUniqueRandomNumbers } from "../utils/number";
import Lotto from "./Lotto";
import { validatePrice } from "./LottoValidate";

export default class AutoLottoPrinter {
  #lottoPrice;

  constructor(lottoPrice) {
    validatePrice(lottoPrice);
    this.#lottoPrice = lottoPrice;
  }

  #generateLottoNumbers() {
    return generateUniqueRandomNumbers(
      LOTTO.NUMBER_COUNT,
      LOTTO.MIN_NUMBER,
      LOTTO.MAX_NUMBER
    );
  }

  #getBuyingLottoAmount(money) {
    return Math.floor(money / this.#lottoPrice);
  }

  buyLotto(money) {
    this.#validateBuyLotto(money);

    return Array.from(
      { length: this.#getBuyingLottoAmount(money) },
      () => new Lotto(this.#generateLottoNumbers())
    );
  }

  #validateBuyLotto(money) {
    validatePrice(money);

    if (money < this.#lottoPrice) {
      throw new Error(MESSAGE.ERROR.LOTTO_PRICE);
    }
  }

  get lottoPrice() {
    return this.#lottoPrice;
  }
}
