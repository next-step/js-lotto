import {LottoPrize} from '../LottoPrize';

describe('getLottoResult 함수 test', () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const results = [
    {lottery: [1, 2, 3, 4, 5, 6], prize: 'FIRST'},
    {lottery: [1, 2, 3, 4, 5, 7], prize: 'SECOND'},
    {lottery: [1, 2, 3, 4, 5, 8], prize: 'THIRD'},
    {lottery: [1, 2, 3, 4, 7, 9], prize: 'FOURTH'},
    {lottery: [1, 2, 3, 7, 8, 9], prize: 'FIFTH'},
    {lottery: [1, 2, 7, 8, 9, 10], prize: 'LOSS'},
    {lottery: [1, 7, 8, 9, 10, 11], prize: 'LOSS'},
    {lottery: [7, 8, 9, 10, 11, 12], prize: 'LOSS'},
  ];

  test.each(results)('로또 결과에 맞는 등수를 반환한다.', ({lottery, prize}) => {
    const lottoPrize = new LottoPrize({winningNumbers, bonusNumber});
    const result = lottoPrize.getLottoPrize(lottery);

    expect(result).toBe(prize);
  });
});
