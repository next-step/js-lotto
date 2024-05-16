import LottoCalculator from '../src/js/domain/LottoCalculator';
import LottoTicket from '../src/js/domain/LottoTicket';

const context = describe;
const DUPLICATE_BONUS_NUMBERS = [[1], [2], [3], [4], [5], [6]];

const INVALID_WINNING_AMOUNTS = [
  [[]],
  [[1, 2, 3, 4, 5]],
  [[1, 2, 3, 4, 5, 6, 7]],
];

describe('LottoCalculator 생성자 테스트', () => {
  context(
    '당첨번호로 [0, 0, 0, 45, 45, 46]와 같이 중복된 값이 주어질 때',
    () => {
      it('TypeError를 Throw 한다.', () => {
        expect(() => {
          new LottoCalculator({
            winningNumbers: [0, 0, 0, 45, 45, 46],
            winningBonusNumber: 7,
          });
        }).toThrow();
      });
    }
  );

  context.each(DUPLICATE_BONUS_NUMBERS)(
    'winningNumbers가 [1,2,3,4,5,6]이고 winningBonusNumber가 %s 일때',
    (bonusNumber) => {
      it('번호가 중복되므로 TypeError를 Throw한다.', () => {
        expect(
          () =>
            new LottoCalculator({
              winningNumbers: [1, 2, 3, 4, 5, 6],
              winningBonusNumber: bonusNumber,
            })
        ).toThrow();
      });
    }
  );

  context.skip.each(INVALID_WINNING_AMOUNTS)(
    '%s와 같이 유효하지 않은 당첨 금액이 주어질 때',
    (winningAmounts) => {
      it('TypeError를 Throw 한다.', () => {
        expect(
          () =>
            new LottoCalculator({
              winningNumbers: [1, 2, 3, 4, 5, 6],
              winningBonusNumber: 7,
              winningAmounts,
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
      const winningBonusNumber = 7;
      const lottoCalc = new LottoCalculator({
        winningNumbers,
        winningBonusNumber,
      });

      const [lotto1st, lotto2st, lotto3st] = [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 11],
      ].map((lottoNumbers) => new LottoTicket(lottoNumbers));

      // when
      const { profit, chart } = lottoCalc.getStatistics([
        lotto1st,
        lotto2st,
        lotto3st,
      ]);

      // then
      expect(profit).toBe(1500000 + 30000000 + 2000000000);
      expect(chart).toEqual([
        [5, { lottoTickets: [], winningAmount: 5000, matchCount: 3 }],
        [4, { lottoTickets: [], winningAmount: 50000, matchCount: 4 }],
        [3, { lottoTickets: [{}], winningAmount: 1500000, matchCount: 5 }],
        [2, { lottoTickets: [{}], winningAmount: 30000000, matchCount: 5 }],
        [1, { lottoTickets: [{}], winningAmount: 2000000000, matchCount: 6 }],
      ]);
    });
  });

  context('길이가 다른 3개의 로또를 통계를 내렸을 때', () => {
    it('수익률과 차트 배열을 반환한다.', () => {
      // given
      const winningNumbers = [1, 2, 3, 4];
      const winningBonusNumber = 7;
      const lottoCalc = new LottoCalculator({
        winningNumbers,
        winningBonusNumber,
      });

      const [lotto1st, lotto2st, lotto3st] = [
        [1, 2, 3, 4],
        [1, 2, 3, 7],
        [1, 2, 3, 10],
      ].map((lottoNumbers) => new LottoTicket(lottoNumbers));

      // when
      const { profit, chart } = lottoCalc.getStatistics([
        lotto1st,
        lotto2st,
        lotto3st,
      ]);

      // then
      expect(profit).toBe(1500000 + 30000000 + 2000000000);
      expect(chart).toEqual([
        [5, { lottoTickets: [], winningAmount: 5000, matchCount: 1 }],
        [4, { lottoTickets: [], winningAmount: 50000, matchCount: 2 }],
        [3, { lottoTickets: [{}], winningAmount: 1500000, matchCount: 3 }],
        [2, { lottoTickets: [{}], winningAmount: 30000000, matchCount: 3 }],
        [1, { lottoTickets: [{}], winningAmount: 2000000000, matchCount: 4 }],
      ]);
    });
  });
});
