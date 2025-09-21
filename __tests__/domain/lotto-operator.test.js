import { Lotto } from '../../src/domain/lotto';
import { LottoOperator } from '../../src/domain/lotto-operator';
import { LottoWinnerNumber } from '../../src/domain/lotto-winner-number';
import { LottoWinningStat } from '../../src/domain/lotto-winning-stat';

describe('로또 사업자', () => {

  test('요구된 종류와 갯수의 로또를 발행한다.', () => {
    // given
    const lottoOperator = new LottoOperator();

    // when
    const requestedCount = 2;
    const lottos = lottoOperator.Publish(requestedCount);

    // then
    expect(lottos.length).toEqual(requestedCount);
    lottos.forEach(l => expect(l instanceof Lotto).toBeTruthy());
  })

  // TODO : mocking 방법 알아낸 후 구현

  // test('로또 당첨 번호를 뽑는다.', async () => {
  //   // given
  //   const lottoOperator = new LottoOperator();
  //   const rl = readline.createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //   })
  //   mock()

  //   // when
  //   const lottoWinnerNumber = await lottoOperator.DrawWinningNumber(rl);

  //   // then
  //   expect(lottoWinnerNumber instanceof LottoWinnerNumber).toBeTruthy();
  // })

  test('당첨 통계를 계산한다.', () => {
    // given
    const lottoOperator = new LottoOperator();
    const lottos = [
      new Lotto([8, 21, 23, 41, 42, 43]),
      new Lotto([3, 5, 11, 16, 32, 38]),
      new Lotto([7, 11, 16, 35, 36, 44]),
      new Lotto([1, 8, 11, 31, 41, 42]),
      new Lotto([13, 14, 16, 38, 42, 45]), 
      new Lotto([7, 11, 30, 40, 42, 43]),
      new Lotto([2, 13, 22, 32, 38, 45]),
      new Lotto([1, 3, 5, 14, 22, 45])
    ]
    const lottoWinnerNumber = new LottoWinnerNumber([1, 2, 3, 4, 5, 6], 7);

    // when

    const lottoWinningStat = lottoOperator.CalculateLottoWinningStat(lottos, lottoWinnerNumber);

    // then
    expect(lottoWinningStat instanceof LottoWinningStat).toBeTruthy();
    expect(lottoWinningStat.MatchedCount(3)).toEqual(1);
    expect(lottoWinningStat.MatchedCount(4)).toEqual(0);
    expect(lottoWinningStat.MatchedCount(5)).toEqual(0);
    expect(lottoWinningStat.matchedFiveAndBonusCount).toEqual(0);
    expect(lottoWinningStat.MatchedCount(6)).toEqual(0);
  })
})