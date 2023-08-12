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

  test('로또 발급 번호는 1~45 사이의 숫자이다.', () => {
    const lotto = new Lotto(2);
    lotto.lotteries.forEach(lottery => {
      lottery.forEach(number => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });
  });

  test('로또 발급 번호는 중복되지 않으며 오름차순이다.', () => {
    const lotto = new Lotto(2);
    lotto.lotteries.forEach(lottery => {
      const isUniqueAndAscending = lottery.every((number, index, arr) => {
        if (index === 0) return true;
        return number > arr[index - 1];
      });

      expect(isUniqueAndAscending).toBe(true);
    });
  });
});
