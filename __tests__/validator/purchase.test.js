import ERROR from '../../src/js/constants/error.js';
import checkValidPurchase from '../../src/js/validator/purchase.js';

describe('구입 금액 유효성 테스트', () => {
  it.each([1_000, 10_000, 9999_000])('단위와 맞는 금액을 입력할 시 에러가 발생하지 않는다.', (money) => {
    expect(() => {
      checkValidPurchase(money);
    }).not.toThrow();
  });

  it.each([990, 9, 1001, 99991900, NaN, 0, -1000])('단위와 맞지 않는 금액을 입력할 시 에러가 발생한다.', (money) => {
    expect(() => {
      checkValidPurchase(money);
    }).toThrow(ERROR.PURCHASE.UNMATCHED_PRICE_PER_SHEET);
  });
});
