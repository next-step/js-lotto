import { LottoNumber } from "../../src/domain/lotto-number.js";
import { LottoStore } from "../../src/domain/lotto-store.js";
import { Lotto } from "../../src/domain/lotto.js";

describe("LottoStore", () => {
  it("구입금액에 따라 로또를 판매할 수 있습니다.", () => {
    // given
    const price = 8000;
    const lottoStore = new LottoStore(price);
    const expected = 8;

    // when
    const actual = lottoStore.sell();

    // then
    expect(actual.length).toEqual(expected);
  });
  it("보너스 번호가 당첨 번호에 포함되면 오류가 발생합니다.", () => {
    // given
    const winningNumber = Lotto.from("1,2,3,4,5,6");
    const bonusNumber = LottoNumber.from("1");
    const lottoStore = new LottoStore();

    // when

    // then
    expect(() => lottoStore.validateBonusNumber(winningNumber, bonusNumber));
  });
});
