import {Lotto} from '../Lotto';

describe('Lotto class test', () => {
  test('주어진 개수만큼 로또번호를 발급한다.', () => {
    const lotto = new Lotto(8);
    expect(lotto.lotteries.length).toBe(8);
  });

  test('로또 발급 번호는 6개이다.', () => {
    const lotto = new Lotto(2);
    lotto.lotteries.forEach(lottery => {
      expect(lottery.length).toBe(6);
    });
  });
});
