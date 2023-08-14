import { getProfitRate, parseSeparatedNumbers, sortNumberArray } from '../index.js';

describe('util functions test', () => {
  test('profitRateCalculator', () => {
    //given
    const MONEY = 1000;
    const TOTAL = 2000;

    //then
    expect(getProfitRate(MONEY, TOTAL)).toEqual('100.0');
    // console.log(profitRateCalculator(MONEY, TOTAL))
  });

  test('arraySorter', () => {
    //given
    const ARRAY = [6, 5, 4, 3, 2, 1];

    //then
    expect(sortNumberArray(ARRAY)).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });

  test('parseSeparatedNumbers', () => {
    //given
    const INPUT = '1,2,3,4,5,6';

    //then
    expect(parseSeparatedNumbers(INPUT)).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
