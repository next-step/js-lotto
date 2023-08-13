import {VALIDATE_ONLY_NUMBER_ERROR, validateOnlyNumber} from '../validateOnlyNumber';

describe('validateOnlyNumber function', () => {
  test.each(['123', '1', '0123'])('숫자만 있는 문자열은 에러가 발생하지 않는다.', text => {
    expect(() => validateOnlyNumber(text)).not.toThrow();
  });

  test.each(['123a', '-', '', ' ', '1.1', 'abc'])(
    '숫자가 없거나, 숫자가 아닌 문자가 포함되면 에러가 발생한다.',
    text => {
      expect(() => validateOnlyNumber(text)).toThrow(VALIDATE_ONLY_NUMBER_ERROR.NOT_NUMBER);
    },
  );
});
