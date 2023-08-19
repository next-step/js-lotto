import {getLottoResult} from '../getLottoResult';

describe('getLottoResult function', () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test('로또 결과에 따른 등수 결과를 반환한다.', () => {
    const lotteries = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [9, 10, 11, 12, 13, 14],
    ];
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

  test.each([
    {lottery: [1, 2, 3, 4, 5, 6], prize: 'FIRST'},
    {lottery: [1, 2, 3, 4, 5, 7], prize: 'SECOND'},
    {lottery: [1, 2, 3, 4, 5, 8], prize: 'THIRD'},
    {lottery: [1, 2, 3, 4, 8, 9], prize: 'FOURTH'},
    {lottery: [1, 2, 3, 8, 9, 10], prize: 'FIFTH'},
    {lottery: [4, 5, 7, 8, 9, 10], prize: 'LOSS'},
  ])(
    `로또 결과 ${winningNumbers}와 보너스 번호 ${bonusNumber} 에 대해 $lottery 등수는 $prize 이다.`,
    ({lottery, prize}) => {
      const lotteries = [lottery];
      const result = getLottoResult({lotteries, winningNumbers, bonusNumber});
      expect(result[prize]).toBe(1);
    },
  );
});
