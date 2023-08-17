import ERROR from '../../src/js/constants/error.js';

describe('재시작 유효성 테스트', () => {
  it.each(['네', '아니요', '하하!', 100, ''])('단위와 맞지 않는 금액을 입력할 시 에러가 발생한다.', (code) => {
    expect(() => {
      checkValidRetryCode(code);
    }).toThrow(ERROR.RETRY.INVALID_CODE);
  });
});
