import { Lotto } from '../../src/domain/lotto';
import { LottoOperator } from '../../src/domain/lotto-operator';
import { LottoWinnerNumber } from '../../src/domain/lotto-winner-number';

describe('로또 당첨 통계', () => {
  test.each([
    [3, [new Lotto([1, 2, 3, 4, 5, 6])], new LottoWinnerNumber([1, 2, 3, 11, 12, 13], 14)],
    [4, [new Lotto([1, 2, 3, 4, 5, 6])], new LottoWinnerNumber([1, 2, 3, 4, 12, 13], 14)],
    [5, [new Lotto([1, 2, 3, 4, 5, 6])], new LottoWinnerNumber([1, 2, 3, 4, 5, 13], 14)],
    [6, [new Lotto([1, 2, 3, 4, 5, 6])], new LottoWinnerNumber([1, 2, 3, 4, 5, 6], 14)]
  ])("%s개 일치를 계산할 수 있다", (matchedCountTarget, lottos, lottoWinnerNumber) => {
    // given
    const lottoOperator = new LottoOperator();

    // when
    const lottoWinningStat = lottoOperator.CalculateLottoWinningStat(lottos, lottoWinnerNumber);

    // then
    expect(lottoWinningStat.MatchedCount(matchedCountTarget)).toEqual(1);
  })

  test("5개 일치와 보너스 번호 일치를 계산할 수 있다", () => {
    // given
    const lottoOperator = new LottoOperator();
    const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
    const lottoWinnerNumber = new LottoWinnerNumber([1, 2, 3, 4, 5, 11], 6)

    // when
    const lottoWinningStat = lottoOperator.CalculateLottoWinningStat(lottos, lottoWinnerNumber);

    // then
    expect(lottoWinningStat.matchedFiveAndBonusCount).toEqual(1);
  })
})