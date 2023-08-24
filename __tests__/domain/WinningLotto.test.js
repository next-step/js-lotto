import ERROR from '../../src/js/constants/error.js';
import { WinningLotto, Lotto } from '../../src/js/domain/index.js';

describe('당첨 로또 테스트', () => {
  it.each([
    { numbers: [1, 2, 3, 4, 5, 6], bonus: 7 },
    { numbers: [1, 2, 3, 11, 23, 45], bonus: 7 },
    { numbers: [3, 2, 4, 44, 43, 45], bonus: 7 },
  ])('6개의 중복되지 않은 숫자와 보너스를 입력할 시 에러가 발생하지 않는다.', ({ numbers, bonus }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new WinningLotto(numbers, bonus);
    }).not.toThrow();
  });

  it.each([
    { numbers: [1, 2, 3, 4, 5, 6], bonus: 6 },
    { numbers: [1, 2, 3, 11, 23, 45], bonus: 23 },
    { numbers: [3, 2, 4, 44, 43, 45], bonus: 45 },
  ])('중복된 보너스를 입력할 시 에러가 발생한다.', ({ numbers, bonus }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new WinningLotto(numbers, bonus);
    }).toThrow(ERROR.DUPLICATED_WITH_WINNING_NUMBER);
  });

  it.each([
    { buy: [1, 2, 3, 4, 5, 6], numbers: [1, 2, 3, 4, 5, 6], matched: 6 },
    { buy: [1, 2, 3, 4, 5, 6], numbers: [1, 2, 3, 11, 23, 45], matched: 3 },
    { buy: [1, 2, 3, 4, 5, 6], numbers: [40, 41, 42, 43, 44, 45], matched: 0 },
  ])('당첨 로또는 입력된 로또와 몇개가 동일한지 알 수 있다.', ({ buy, numbers, matched }) => {
    const lotto = new Lotto(buy);
    const winningLotto = new WinningLotto(numbers, 7);

    expect(winningLotto.getMatchedCount(lotto)).toBe(matched);
  });

  it.each([
    { buy: [1, 2, 3, 4, 5, 6], numbers: [1, 2, 3, 4, 5, 10], result: true },
    { buy: [7, 8, 9, 10, 11, 12], numbers: [1, 2, 3, 11, 23, 45], result: false },
  ])('당첨 로또는 입력된 로또가 보너스를 보유하는지 알 수 있다.', ({ buy, numbers, result }) => {
    const lotto = new Lotto(buy);
    const winningLotto = new WinningLotto(numbers, 6);

    expect(winningLotto.hasBonus(lotto)).toEqual(result);
  });
});
