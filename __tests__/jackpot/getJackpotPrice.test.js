import { JACKPOT } from '../../src/domains/jackpot/constant';
import { getJackpotPrice } from '../../src/domains/jackpot/utils';

describe('getJackpotPrice 관련 함수', () => {
  describe('1등부터 5등까지 당첨 금액이 있으며', () => {
    test('1등은 "2,000,000,000"을 반환한다.', () => {
      const price = getJackpotPrice(1);

      expect(price).toBe(JACKPOT.RULES.FIRST.price);
    });

    test('2등은 "30,000,000"을 반환한다.', () => {
      const price = getJackpotPrice(2);

      expect(price).toBe(JACKPOT.RULES.SECOND.price);
    });

    test('3등은 "1,500,000"을 반환한다.', () => {
      const price = getJackpotPrice(3);

      expect(price).toBe(JACKPOT.RULES.THIRD.price);
    });

    test('4등은 "50,000"을 반환한다.', () => {
      const price = getJackpotPrice(4);

      expect(price).toBe(JACKPOT.RULES.FOURTH.price);
    });

    test('5등은 "5,000"을 반환한다.', () => {
      const price = getJackpotPrice(5);

      expect(price).toBe(JACKPOT.RULES.FIFTH.price);
    });

    test('다른 등수는 "0"을 반환한다.', () => {
      const price = getJackpotPrice(6);

      expect(price).toBe(0);
    });
  });
});
