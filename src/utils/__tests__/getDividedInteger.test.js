import {getDividedInteger} from '../getDividedInteger';

describe('getDividedInteger 함수 test', () => {
  test('나머지를 버린 값만 반환한다.', () => {
    expect(getDividedInteger(10, 3)).toBe(3);
    expect(getDividedInteger(12, 3)).toBe(4);
  });

  test('0으로 나눌 수 없다.', () => {
    expect(() => getDividedInteger(10, 0)).toThrow();
  });
});
