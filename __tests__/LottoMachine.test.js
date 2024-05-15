import LottoMachine from '../src/js/domain/LottoMachine';
import LottoTicket from '../src/js/domain/LottoTicket';
import {
  generateLottoNumberArray,
  isValidLottoNumberArray,
} from '../src/js/utils/LottoUtil';

const context = describe;
const DUPLICATE_BONUS_NUMBERS = [[1], [2], [3], [4], [5], [6]];
const INVALID_WINNING_AMOUNTS = [
  [[]],
  [[1, 2, 3, 4, 5]],
  [[1, 2, 3, 4, 5, 6, 7]],
];

describe('로또 머신 기능 테스트', () => {
  describe('LottoMachine 생성자 테스트', () => {
    context('LottoMachine 가 생성될 때', () => {
      it('winningNumbers(당첨번호), bonusWinningNumber(보너스번호)를 프로퍼티로 가진다.', () => {
        const lottoMachine = new LottoMachine();

        expect(lottoMachine).toHaveProperty('winningNumbers');
        expect(lottoMachine).toHaveProperty('bonusWinningNumber');
      });
    });
  });

  describe('LottoMachine setter 테스트', () => {
    context(
      'winningNumbers(당첨 번호)로 [1, 2, 3, 4, 5, 6] 가 주어질 때',
      () => {
        it('유효한 로또 번호 검사 결과가 ture 이다.', () => {
          // given
          const lottoMachine = new LottoMachine();

          // when
          lottoMachine.winningNumbers = [1, 2, 3, 4, 5, 6];

          // then
          expect(
            isValidLottoNumberArray(lottoMachine.winningNumbers)
          ).toBeTruthy();
        });
      }
    );

    context(
      'winningNumbers가 generateLottoNumberArray()를 통해 값이 주어질 때',
      () => {
        it('유효성 검사 결과가 true 이다.', () => {
          // given
          const lottoMachine = new LottoMachine();

          // when
          lottoMachine.winningNumbers = generateLottoNumberArray();

          // then
          expect(
            isValidLottoNumberArray(lottoMachine.winningNumbers)
          ).toBeTruthy();
        });
      }
    );

    context(
      'winningNumbers가 [0, 0, 0, 45, 45, 46]와 같이 중복된 값이 주어질 때',
      () => {
        it('TypeError를 Throw 한다.', () => {
          // given
          const lottoMachine = new LottoMachine();

          // when
          lottoMachine.winningNumbers = generateLottoNumberArray();

          // then
          expect(() => {
            lottoMachine.winningNumbers = [0, 0, 0, 45, 45, 46];
          }).toThrow();
        });
      }
    );

    context('bonusWinningNumber(보너스 번호)로 7이 주어질 때', () => {
      it('bonusWinningNumber의 값은 7이다.', () => {
        // given
        const lottoMachine = new LottoMachine();
        lottoMachine.winningNumbers = [1, 2, 3, 4, 5, 6];

        // when
        lottoMachine.bonusWinningNumber = 7;

        // then
        expect(lottoMachine.bonusWinningNumber).toBe(7);
      });
    });

    context.each(DUPLICATE_BONUS_NUMBERS)(
      'winningNumbers가 [1,2,3,4,5,6]이고 bonusWinningNumber가 %s 일때',
      (bonusNumber) => {
        it('번호가 중복되므로 TypeError를 Throw한다.', () => {
          const lottoMachine = new LottoMachine();
          lottoMachine.winningNumbers = [1, 2, 3, 4, 5, 6];

          expect(
            () => (lottoMachine.bonusWinningNumber = bonusNumber)
          ).toThrow();
        });
      }
    );
  });

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

          expect(() =>
            lottoMachine.sellAutoLottoTicket(invalidValue)
          ).toThrow();
        });
      }
    );
  });

  describe('로또 통계 테스트', () => {
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
});
