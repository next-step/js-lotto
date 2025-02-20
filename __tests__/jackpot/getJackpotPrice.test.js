import { getJackpotPrice } from '../../src/domains/jackpot/utils';

describe('getJackpotPrice 관련 함수', () => {
  describe('1등부터 5등까지 당첨 금액이 있으며', () => {
    test.each([
      {
        description: '1등은 "2,000,000,000"을 반환한다.',
        rank: 1,
        price: 2_000_000_000,
      },
      {
        description: '2등은 "30,000,000"을 반환한다.',
        rank: 2,
        price: 30_000_000,
      },
      {
        description: '3등은 "1,500,000"을 반환한다.',
        rank: 3,
        price: 1_500_000,
      },
      { description: '4등은 "50,000"을 반환한다.', rank: 4, price: 50_000 },
      { description: '5등은 "5,000"을 반환한다.', rank: 5, price: 5000 },
      { description: '다른 등수는 "0"을 반환한다.', rank: 6, price: 0 },
    ])('$description', ({ rank, price }) => {
      expect(getJackpotPrice(rank)).toBe(price);
    });
  });
});
