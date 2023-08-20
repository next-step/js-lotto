import {splitNumbers} from '../splitNumbers';

describe('splitNumbers 함수 test', () => {
  test(',를 기준으로 나눈 숫자들을 반환한다.', () => {
    const numbers = '1,2,3,4,5,6';
    const result = splitNumbers(numbers);

    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('숫자가 아닌 값이 포함되어 있으면 해당 값을 생략하고 반환한다.', () => {
    const numbers = '1,2,a34,5, ,7,b,a,10,-,12';
    const result = splitNumbers(numbers);

    expect(result).toEqual([1, 2, 5, 7, 10, 12]);
  });
});
