import { LottoStore } from "../../src/domain/lotto-store.js";

describe("LottoStore", () => {
  it("구입금액에 따라 로또를 판매할 수 있습니다.", () => {
    // given
    const price = 8000;
    const lottoStore = new LottoStore(price);

    // when
    const actual = lottoStore.sell();

    // then
    expect(actual.length).toEqual(8);
  });
});
