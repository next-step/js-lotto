import { getJackpotPrice } from '../../src/domains/jackpot/utils';

describe('getJackpotPrice 관련 함수', () => {
  describe('1등부터 5등까지 당첨 금액이 있으며', () => {
    test.each([
      ['1등은 "2,000,000,000"을 반환한다.', 1, 2_000_000_000],
      ['2등은 "30,000,000"을 반환한다.', 2, 30_000_000],
      ['3등은 "1,500,000"을 반환한다.', 3, 1_500_000],
      ['4등은 "50,000"을 반환한다.', 4, 50_000],
      ['5등은 "5,000"을 반환한다.', 5, 5000],
      ['다른 등수는 "0"을 반환한다.', 6, 0],
    ])('%s', (_, rank, price) => {
      expect(getJackpotPrice(rank)).toBe(price);
    });
  });
});
