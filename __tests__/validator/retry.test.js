import ERROR from '../../src/js/constants/error.js';
import { LOTTO_RETRY_CODE } from '../../src/js/constants/lotto-config.js';
import checkValidRetry from '../../src/js/validator/retry.js';

describe('재시작 유효성 테스트', () => {
  it.each([
    {
      code: LOTTO_RETRY_CODE.CONFIRM,
    },
    {
      code: LOTTO_RETRY_CODE.REJECT,
    },
  ])('$code을 입력할 시 에러가 발생하지 않는다.', ({ code }) => {
    expect(() => {
      checkValidRetry(code);
    }).not.toThrow();
  });

  it.each([
    {
      code: '네',
    },
    {
      code: '아니요',
    },
    {
      code: '하하',
    },
    {
      code: '100',
    },
    {
      code: '',
    },
  ])(
    `${LOTTO_RETRY_CODE.CONFIRM}이나 ${LOTTO_RETRY_CODE.REJECT}가 아닌 $code을 입력할 시 에러가 발생한다.`,
    ({ code }) => {
      expect(() => {
        checkValidRetry(code);
      }).toThrow(ERROR.INVALID_CODE);
    }
  );
});
