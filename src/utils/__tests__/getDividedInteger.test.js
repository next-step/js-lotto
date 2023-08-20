import {getDividedInteger} from '../getDividedInteger';

describe('getDividedInteger 함수 test', () => {
  test.each([
    [10, 3, 3],
    [12, 3, 4],
    [15, 1, 15],
    [0, 2, 0],
    [11, 4, 2],
  ])('%d를 %d로 나눈 몫은 %d이다.', (dividend, divisor, expected) => {
    expect(getDividedInteger(dividend, divisor)).toBe(expected);
  });

  test('0으로 나눌 수 없다.', () => {
    expect(() => getDividedInteger(10, 0)).toThrow();
  });
});
