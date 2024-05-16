import LottoMachine from '../src/js/domain/LottoMachine';
import LottoTicket from '../src/js/domain/LottoTicket';

const context = describe;
const INVALID_WINNING_AMOUNTS = [
  [[]],
  [[1, 2, 3, 4, 5]],
  [[1, 2, 3, 4, 5, 6, 7]],
];

describe('당첨 금액 설정 테스트', () => {
  context.each(INVALID_WINNING_AMOUNTS)(
    '%s와 같이 유효하지 않은 당첨 금액이 주어질 때',
    (winningAmount) => {
      it('TypeError를 Throw 한다.', () => {
        expect(() => new LottoMachine(winningAmount)).toThrow();
      });
    }
  );
});

describe('로또 발권 테스트', () => {
  context('로또금액 1_000원 보다 적은 800을 지불할 때', () => {
    it(`"${LottoMachine.NOT_ENOUGH_MONEY}" 에러를 Throw한다.`, () => {
      const lottoMachine = new LottoMachine();

      expect(() => lottoMachine.sellAutoLottoTicket(800)).toThrow();
    });
  });

  context('로또 금액 1_000원 보다 많은 2_000원 을 지불할 때', () => {
    it('lottoTickets의 길이는 2이다.', () => {
      // given
      const lottoMachine = new LottoMachine();

      // when
      const lottoTickets = lottoMachine.sellAutoLottoTicket(2_000);

      // then
      expect(lottoTickets).toHaveLength(2);
    });
    it('lottoTickets은 모두 LottoTicket 인스턴스를 가져야 한다. 기대값: true', () => {
      // given
      const lottoMachine = new LottoMachine();

      // when
      const lottoTickets = lottoMachine.sellAutoLottoTicket(2_000);

      // then
      expect(
        lottoTickets.every((lotto) => lotto instanceof LottoTicket)
      ).toBeTruthy();
    });
  });

  context.each([['1000'], [Infinity], [Number.MAX_SAFE_INTEGER + 1]])(
    'sellAutoLottoTicket() 매개변수로 %s가 주어질 때',
    (invalidValue) => {
      it('TypeError를 Throw한다.', () => {
        const lottoMachine = new LottoMachine();

        expect(() => lottoMachine.sellAutoLottoTicket(invalidValue)).toThrow();
      });
    }
  );
});

describe.skip('로또 통계 테스트', () => {
  context('1,2,3등인 3개의 로또를 통계를 내렸을 때', () => {
    it('수익률과 차트 배열을 반환한다.', () => {
      // given
      const lottoMachine = new LottoMachine();
      lottoMachine.winningNumbers = [1, 2, 3, 4, 5, 6];
      lottoMachine.bonusWinningNumber = 7;

      const [lotto1st, lotto2st, lotto3st] = Array.from(
        { length: 3 },
        () => new LottoTicket()
      );
      lotto1st.lottoNumbers = [1, 2, 3, 4, 5, 6];
      lotto2st.lottoNumbers = [1, 2, 3, 4, 5, 7];
      lotto3st.lottoNumbers = [1, 2, 3, 4, 5, 11];

      // when
      const { netReturn, chart } = lottoMachine.getStatistics([
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
