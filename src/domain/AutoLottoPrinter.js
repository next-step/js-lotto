import { LOTTO } from "../constant";
import { generateUniqueRandomNumbers } from "../utils/number";
import { isNaturalNumber } from "../utils/validation";
import Lotto from "./Lotto";

export default class AutoLottoPrinter {
  #lottoPrice;

  constructor(lottoPrice) {
    this.#validatePrice(lottoPrice);
    this.#lottoPrice = lottoPrice;
  }

  #generateLottoNumbers() {
    return generateUniqueRandomNumbers(
      LOTTO.NUMBER_COUNT,
      LOTTO.MIN_NUMBER,
      LOTTO.MAX_NUMBER
    );
  }

  getBuyingLottoAmount(money) {
    return Math.floor(money / this.#lottoPrice);
  }

  buyLotto(money) {
    this.#validateBuyLotto(money);

    return Array.from(
      { length: this.getBuyingLottoAmount(money) },
      () => new Lotto(this.#generateLottoNumbers())
    );
  }

  #validatePrice(price) {
    if (!isNaturalNumber(price)) {
      throw new Error("금액은 자연수이어야 합니다.");
    }
  }

  #validateBuyLotto(money) {
    this.#validatePrice(money);

    if (money < this.#lottoPrice) {
      throw new Error(
        "로또 구매 금액은 로또 한 장의 가격보다 적을 수 없습니다."
      );
    }
  }
}
