import { LottoShop } from "../src/domain/LottoShop.js";
import { Lotto } from "../src/domain/Lotto.js";
import { LottoNumber } from "../src/domain/LottoNumber.js";

describe(LottoShop.name, () => {
  it("buy: 구입 금액에 맞는 개수의 로또를 반환합니다.", () => {
    const amount = 3000;
    const lottos = LottoShop.buy(amount);

    expect(lottos).toHaveLength(amount / LottoShop.LOTTO_PRICE);
    lottos.forEach((lotto) => {
      expect(lotto).toBeInstanceOf(Lotto);
      expect(lotto.value).toHaveLength(LottoShop.LOTTO_NUMBER_COUNT);
      lotto.value.forEach((num) => {
        expect(num).toBeInstanceOf(LottoNumber);
      });
    });
  });

  it("createLotto: 번호 배열로 로또를 생성하면 올바른 Lotto 인스턴스를 반환합니다.", () => {
    const numbers = [10, 20, 30, 40, 1, 2];
    const lotto = LottoShop.createLotto(numbers);

    expect(lotto).toBeInstanceOf(Lotto);
    expect(lotto.value).toHaveLength(LottoShop.LOTTO_NUMBER_COUNT);
    lotto.value.forEach((num) => {
      expect(num).toBeInstanceOf(LottoNumber);
    });

    const sorted = [...numbers].sort((a, b) => a - b);
    expect(lotto.value.map((n) => n.value)).toEqual(sorted);
  });
});
