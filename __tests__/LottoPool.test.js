import LottoPool from "../src/domain/LottoPool";

describe("로또풀 기능", () => {
  test("로또풀에서 가져온 로또 넘버는 같다", () => {
    // given
    const lottoNumber1 = LottoPool.generateLottoNumber(5);
    const lottoNumber2 = LottoPool.generateLottoNumber(5);

    expect(lottoNumber1 === lottoNumber2).toEqual(true);
  });
});
