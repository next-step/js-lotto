import {getPercentage} from '../getPercentage';

describe('getPercentage 함수 test', () => {
  test('소수점 자리수의 기본값은 0이다.', () => {
    const result = getPercentage({value: 2, total: 3});

    expect(result).toBe('67');
  });

  test('소수점 자리수만큼 반올림한다.', () => {
    const result = getPercentage({value: 2, total: 3}, 2);

    expect(result).toBe('66.67');
  });
});
