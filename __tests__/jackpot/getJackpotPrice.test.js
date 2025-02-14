import { getJackpotPrice } from '../../src/domains/jackpot/utils';

describe('getJackpotPrice 관련 함수', () => {
  describe('1등부터 5등까지 당첨 금액이 있으며', () => {
    test('1등은 "2,000,000,000"을 반환한다.', () => {
      const price = getJackpotPrice(1);

      expect(price).toBe(2_000_000_000);
    });

    test('2등은 "30,000,000"을 반환한다.', () => {
      const price = getJackpotPrice(2);

      expect(price).toBe(30_000_000);
    });

    test('3등은 "1,500,000"을 반환한다.', () => {
      const price = getJackpotPrice(3);

      expect(price).toBe(1_500_000);
    });

    test('4등은 "50,000"을 반환한다.', () => {
      const price = getJackpotPrice(4);

      expect(price).toBe(50_000);
    });

    test('5등은 "5,000"을 반환한다.', () => {
      const price = getJackpotPrice(5);

      expect(price).toBe(5000);
    });

    test('다른 등수는 "0"을 반환한다.', () => {
      const price = getJackpotPrice(6);

      expect(price).toBe(0);
    });
  });
});
