import LottoMachine from '../src/js/domain/LottoMachine';
import LottoTicket from '../src/js/domain/LottoTicket';
import {
  generateLottoNumberArray,
  isValidLottoNumberArray,
} from '../src/js/utils/LottoUtil';
import { LOTTO } from '../src/js/constants';

describe('로또 머신 기능 테스트', () => {
  it('로또 머신은 당첨번호, 보너스번호를 가진다.', () => {
    const lottoMachine = new LottoMachine();

    expect(lottoMachine).toHaveProperty('winningNumbers');
    expect(lottoMachine).toHaveProperty('bonusWinningNumber');
  });

  describe('당첨 번호 설정', () => {
    it('당첨 번호를 설정할 수 있다.', () => {
      // given
      const lottoMachine = new LottoMachine();

      // when
      lottoMachine.winningNumbers = generateLottoNumberArray();

      // then
      expect(isValidLottoNumberArray(lottoMachine.winningNumbers)).toBeTruthy();
    });

    it('보너스 번호를 설정할 수 있다.', () => {
      // given
      const lottoMachine = new LottoMachine();
      lottoMachine.winningNumbers = [1, 2, 3, 4, 5, 6];

      // when
      lottoMachine.bonusWinningNumber = 7;

      // then
      expect(lottoMachine.bonusWinningNumber).toBe(7);
      expect(() => (lottoMachine.bonusWinningNumber = 0)).toThrow();
      expect(() => (lottoMachine.bonusWinningNumber = 6)).toThrow();
    });
  });

  it('당첨 번호 설정', () => {
    // given
    const lottoMachine = new LottoMachine();

    // when
    lottoMachine.winningNumbers = generateLottoNumberArray();

    // then
    expect(isValidLottoNumberArray(lottoMachine.winningNumbers)).toBeTruthy();
    expect(() => {
      lottoMachine.winningNumbers = [0, 0, 0, 45, 45, 46];
    }).toThrow();
  });

  describe('당첨 금액 설정', () => {
    it.each([[[]], [[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
      '%s는 당첨 금액으로 설정할 수 없다.',
      (winningAmount) => {
        expect(() => new LottoMachine(winningAmount)).toThrow();
      }
    );
  });

  describe('로또 발권', () => {
    it('지불할 금액이 로또 금액보다 적다면 에러를 발생한다.', () => {
      const lottoMachine = new LottoMachine();

      expect(() => lottoMachine.sellAutoLottoTicket(800)).toThrow();
    });

    it('지불한 금액에 따라 n개의 로또를 발권한다. (자동)', () => {
      // given
      const lottoMachine = new LottoMachine();

      // when
      const lottoTickets = lottoMachine.sellAutoLottoTicket(2_000);

      // then
      expect(lottoTickets).toHaveLength(2);
      expect(
        lottoTickets.every((lotto) => lotto instanceof LottoTicket)
      ).toBeTruthy();
    });

    it.each([['1000'], [Infinity], [Number.MAX_SAFE_INTEGER + 1]])(
      '"%s" 는 sellAutoLottoTicket() 매개변수로 전달될 수 없습니다.',
      (invalidValue) => {
        const lottoMachine = new LottoMachine();

        expect(() => lottoMachine.sellAutoLottoTicket(invalidValue)).toThrow();
      }
    );
  });

  it.skip('n개의 로또의 결과를 반환한다.', () => {
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

    const expected = lottoMachine.winningAmount
      .slice(0, 3)
      .reduce((acc, cur) => acc + cur, 0);

    // when
    const { chart, netReturn } = lottoMachine.getLottoResult([
      lotto1st,
      lotto2st,
      lotto3st,
    ]);

    // then
    expect([...chart]).toEqual([
      [
        `${LOTTO.RANK_1}`,
        {
          lottoTicketCount: 1,
          winningAmount: lottoMachine.winningAmount[0],
          matchCount: 6,
        },
      ],
      [
        `${LOTTO.RANK_2}`,
        {
          lottoTicketCount: 1,
          winningAmount: lottoMachine.winningAmount[1],
          matchCount: 5,
        },
      ],
      [
        `${LOTTO.RANK_3}`,
        {
          lottoTicketCount: 1,
          winningAmount: lottoMachine.winningAmount[2],
          matchCount: 5,
        },
      ],
      [
        `${LOTTO.RANK_4}`,
        {
          lottoTicketCount: 0,
          winningAmount: lottoMachine.winningAmount[3],
          matchCount: 4,
        },
      ],
      [
        `${LOTTO.RANK_5}`,
        {
          lottoTicketCount: 0,
          winningAmount: lottoMachine.winningAmount[4],
          matchCount: 3,
        },
      ],
      [
        `${LOTTO.UNRANKED}`,
        {
          lottoTicketCount: 0,
          winningAmount: lottoMachine.winningAmount[5],
          matchCount: null,
        },
      ],
    ]);
    expect(netReturn).toBe(expected);
  });
});
