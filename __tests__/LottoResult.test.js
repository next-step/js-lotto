import { Lotto } from "../src/domain/Lotto";
import { LottoResult } from "../src/domain/LottoResult";

describe("로또결과 테스트", () => {
  test("사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 순위를 정한다.", () => {
    // given
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([1, 2, 3, 4, 5, 7]);
    const lotto3 = new Lotto([1, 2, 3, 4, 5, 8]);
    const lotto4 = new Lotto([1, 2, 3, 4, 8, 9]);
    const lotto5 = new Lotto([1, 2, 3, 8, 9, 10]);
    const lotto6 = new Lotto([1, 2, 7, 8, 9, 10]);
    const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);

    // when
    const rank1 = lottoResult.getRanking(lotto1);
    const rank2 = lottoResult.getRanking(lotto2);
    const rank3 = lottoResult.getRanking(lotto3);
    const rank4 = lottoResult.getRanking(lotto4);
    const rank5 = lottoResult.getRanking(lotto5);
    const rank6 = lottoResult.getRanking(lotto6);

    // then
    expect(rank1).toBe(1);
    expect(rank2).toBe(2);
    expect(rank3).toBe(3);
    expect(rank4).toBe(4);
    expect(rank5).toBe(5);
    expect(rank6).toBe(6);
  });
});
