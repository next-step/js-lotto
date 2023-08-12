import {getLottoResult} from '../getLottoResult';

describe('getLottoResult function', () => {
  test('로또 결과에 따른 등수 결과를 반환한다.', () => {
    const lotteries = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [9, 10, 11, 12, 13, 14],
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const result = getLottoResult({lotteries, winningNumbers, bonusNumber});
    expect(result).toEqual({
      FIRST: 1,
      SECOND: 1,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
      LOSS: 1,
    });
  });
});
