import { Lotto } from "../src/domain/Lotto.js";

describe(Lotto.name, () => {
  it(`로또는 발급하면 서로 겹치지 않는 ${Lotto.LOTTO_NUMBER_MIN}~${Lotto.LOTTO_NUMBER_MAX} 사이의 ${Lotto.LOTTO_NUMBER_COUNT_MAX}개의 숫자를 반환한다.`, () => {
    const lotto = new Lotto();

    const lottoNumbers = lotto.issue();
    const lottoNumbersSet = new Set(lottoNumbers);

    const isValidLottoNumber = lottoNumbers.every(
      (lottoNumber) =>
        lottoNumber >= Lotto.LOTTO_NUMBER_MIN &&
        lottoNumber <= Lotto.LOTTO_NUMBER_MAX
    );

    expect(isValidLottoNumber).toBe(true);
    expect(lottoNumbersSet.size).toBe(Lotto.LOTTO_NUMBER_COUNT_MAX);
  });
});
