import { getJackpotTotalAmount } from '../../src/domains/jackpot/utils';

describe('getJackpotTotalAmount에 관한 테스트', () => {
  test('빈 배열을 넣으면 총 0원으로 계산된다.', () => {
    const total = getJackpotTotalAmount([]);

    expect(total).toBe(0);
  });

  test('5등을 2번이 걸렸으면 총 10,000원으로 계산된다.', () => {
    const total = getJackpotTotalAmount([
      { isJackpot: true, rank: 5, price: 5000, matchedCount: 3 },
      { isJackpot: false, rank: 0, price: 0, matchedCount: 2 },
      { isJackpot: true, rank: 5, price: 5000, matchedCount: 3 },
    ]);

    expect(total).toBe(10_000);
  });

  test('배열 형태로 주지 않으면 오류를 던진다.', () => {
    expect(() => {
      getJackpotTotalAmount('');
    }).toThrow();
  });
});
