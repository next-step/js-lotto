import {validateRetryType} from '../validateRetryType';
describe('validateRetryType function', () => {
  test('y, n 만 통과한다.', () => {
    expect(() => validateRetryType('y')).not.toThrow();
    expect(() => validateRetryType('n')).not.toThrow();
  });

  test.each(['a', '', ' ', '-d', 'yn', 'ya'])('y, n 이외의 값은 에러를 발생시킨다.', text => {
    expect(() => validateRetryType(text)).toThrow();
  });
});
