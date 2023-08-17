import ERROR from '../../src/js/constants/error.js';
import { LOTTO_RETRY_CODE } from '../../src/js/constants/lotto-config.js';
import { checkValidRetry } from '../../src/js/validator/index.js';

describe('재시작 유효성 테스트', () => {
  it.each([LOTTO_RETRY_CODE.CONFIRM, LOTTO_RETRY_CODE.REJECT])(
    `${LOTTO_RETRY_CODE.CONFIRM}이나 ${LOTTO_RETRY_CODE.REJECT}를 입력할 시 에러가 발생하지 않는다.`,
    (code) => {
      expect(() => {
        checkValidRetry(code);
      }).not.toThrow();
    }
  );

  it.each(['네', '아니요', '하하!', 100, ''])(
    `${LOTTO_RETRY_CODE.CONFIRM}이나 ${LOTTO_RETRY_CODE.REJECT}가 아닌 값을 입력할 시 에러가 발생한다.`,
    (code) => {
      expect(() => {
        checkValidRetry(code);
      }).toThrow(ERROR.RETRY.INVALID_CODE);
    }
  );
});
