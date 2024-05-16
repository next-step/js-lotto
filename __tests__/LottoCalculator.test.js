import LottoCalculator from '../src/js/domain/LottoCalculator';
import LottoTicket from '../src/js/domain/LottoTicket';

const context = describe;
const DUPLICATE_BONUS_NUMBERS = [[1], [2], [3], [4], [5], [6]];

describe('LottoCalculator 생성자 테스트', () => {
  context('당첨번호:[1, 2, 3, 4, 5, 6], 보너스번호:8가 주어질 때', () => {
    it('winningNumbers(당첨번호), bonusWinningNumber(보너스번호)를 프로퍼티로 가진다.', () => {
      const lottoCalc = new LottoCalculator({
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusWinningNumber: 8,
      });

      expect(lottoCalc).toHaveProperty('winningNumbers');
      expect(lottoCalc).toHaveProperty('bonusWinningNumber');
    });
  });

  context(
    '당첨번호로 [0, 0, 0, 45, 45, 46]와 같이 중복된 값이 주어질 때',
    () => {
      it('TypeError를 Throw 한다.', () => {
        expect(() => {
          new LottoCalculator({
            winningNumbers: [0, 0, 0, 45, 45, 46],
            bonusWinningNumber: 7,
          });
        }).toThrow();
      });
    }
  );

  context.each(DUPLICATE_BONUS_NUMBERS)(
    'winningNumbers가 [1,2,3,4,5,6]이고 bonusWinningNumber가 %s 일때',
    (bonusNumber) => {
      it('번호가 중복되므로 TypeError를 Throw한다.', () => {
        expect(
          () =>
            new LottoCalculator({
              winningNumbers: [1, 2, 3, 4, 5, 6],
              bonusWinningNumber: bonusNumber,
            })
        ).toThrow();
      });
    }
  );
});

describe('LottoCalculator 로또 통계 테스트', () => {
  context('1,2,3등인 3개의 로또를 통계를 내렸을 때', () => {
    it('수익률과 차트 배열을 반환한다.', () => {
      // given
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusWinningNumber = 7;
      const lottoCalc = new LottoCalculator({
        winningNumbers,
        bonusWinningNumber,
      });

      const [lotto1st, lotto2st, lotto3st] = Array.from(
        { length: 3 },
        () => new LottoTicket()
      );
      lotto1st.lottoNumbers = [1, 2, 3, 4, 5, 6];
      lotto2st.lottoNumbers = [1, 2, 3, 4, 5, 7];
      lotto3st.lottoNumbers = [1, 2, 3, 4, 5, 11];

      // when
      const { netReturn, chart } = lottoCalc.getStatistics([
        lotto1st,
        lotto2st,
        lotto3st,
      ]);

      // then
      expect(netReturn).toBe(1500000 + 30000000 + 2000000000);
      expect(chart).toEqual([
        [5, { lottoTickets: [], winningAmount: 5000, matchCount: 3 }],
        [4, { lottoTickets: [], winningAmount: 50000, matchCount: 4 }],
        [3, { lottoTickets: [{}], winningAmount: 1500000, matchCount: 5 }],
        [2, { lottoTickets: [{}], winningAmount: 30000000, matchCount: 5 }],
        [1, { lottoTickets: [{}], winningAmount: 2000000000, matchCount: 6 }],
      ]);
    });
  });
});
