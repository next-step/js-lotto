import LottoMachine from '../src/js/domain/LottoMachine';
import LottoTicket from '../src/js/domain/LottoTicket';
import { ERROR_MESSAGE } from '../src/js/constants';

const context = describe;

describe('로또 발권 테스트', () => {
  context('로또금액 1_000원 보다 적은 800을 지불할 때', () => {
    it(`"${ERROR_MESSAGE.NOT_ENOUGH_MONEY}" 에러를 Throw한다.`, () => {
      expect(() => LottoMachine.sellAutoLottoTicket(800)).toThrow();
    });
  });

  context('로또 금액 1_000원 보다 많은 2_000원 을 지불할 때', () => {
    it('lottoTickets의 길이는 2이다.', () => {
      const lottoTickets = LottoMachine.sellAutoLottoTicket(2_000);

      expect(lottoTickets).toHaveLength(2);
    });
    it('lottoTickets은 모두 LottoTicket 인스턴스를 가져야 한다. 기대값: true', () => {
      const lottoTickets = LottoMachine.sellAutoLottoTicket(2_000);

      expect(
        lottoTickets.every((lotto) => lotto instanceof LottoTicket)
      ).toBeTruthy();
    });
  });

  context.each([['1000'], [Infinity], [Number.MAX_SAFE_INTEGER + 1]])(
    'sellAutoLottoTicket() 매개변수로 %s가 주어질 때',
    (invalidValue) => {
      it('TypeError를 Throw한다.', () => {
        expect(() => LottoMachine.sellAutoLottoTicket(invalidValue)).toThrow();
      });
    }
  );
});
