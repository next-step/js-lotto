import { Lotto } from "./Lotto.js";
import { LottoNumber } from "./LottoNumber.js";

export class LottoShop {
  static LOTTO_PRICE = 1000;
  static LOTTO_NUMBER_COUNT = 6;

  static buy(amount) {
    const lottoCountToBuy = amount / LottoShop.LOTTO_PRICE;

    const lottos = Array.from({ length: lottoCountToBuy }).map(() =>
      Lotto.of(
        Array.from({ length: 45 })
          .map((_, index) => index + 1)
          .sort(() => 0.5 - Math.random())
          .slice(0, LottoShop.LOTTO_NUMBER_COUNT)
          .sort((a, b) => a - b)
          .map(LottoNumber.of)
      )
    );

    return lottos;
  }

  static createLotto(numbers) {
    return Lotto.of(numbers.sort((a, b) => a - b).map(LottoNumber.of));
  }
}
