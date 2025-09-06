import { Lotto } from "../src/domain/Lotto.js";

describe(Lotto.name, () => {
  it(`로또를 발급하면 서로 겹치지 않는 ${Lotto.LOTTO_NUMBER_MIN}~${Lotto.LOTTO_NUMBER_MAX} 사이의
     ${Lotto.LOTTO_NUMBER_COUNT_MAX}개의 숫자를 반환한다.`, () => {
    const lottoNumbers = Lotto.issue();
    const lottoNumbersSet = new Set(lottoNumbers);

    const isValidLottoNumber = Lotto.isValidLottoNumber(lottoNumbers);

    expect(isValidLottoNumber).toBe(true);
    expect(lottoNumbersSet.size).toBe(Lotto.LOTTO_NUMBER_COUNT_MAX);
  });
});
