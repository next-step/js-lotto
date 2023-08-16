import ERROR from '../../src/js/constants/error.js';
import checkValidPurchase from '../../src/js/validator/purchase.js';

describe('구입 금액 예외 테스트', () => {
  it.each([990, 9, 1001, 99991900, NaN, 0])('단위와 맞지 않는 금액을 입력할 시 에러가 발생한다.', (money) => {
    expect(() => {
      checkValidPurchase(money);
    }).toThrow(ERROR.PURCHASE.UNMATCHED_PRICE_PER_SHEET);
  });
});
