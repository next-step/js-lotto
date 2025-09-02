import { Lotto } from "../src/domain/Lotto.js";

describe(Lotto.name, () => {
  it("로또는 발급하면 서로 겹치지 않는 1~45 사이의 6개의 숫자를 반환한다.", () => {
    const lotto = new Lotto();
    const lottoNumbers = lotto.issue();

    const lottoNumbersSet = new Set(lottoNumbers);

    expect(lottoNumbersSet.size).toBe(Lotto.LOTTO_NUMBER_COUNT_MAX);
  });
});
