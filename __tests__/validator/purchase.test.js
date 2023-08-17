import ERROR from '../../src/js/constants/error.js';
import { LOTTO_PRICE } from '../../src/js/constants/lotto-config.js';
import checkValidPurchase from '../../src/js/validator/purchase.js';

describe('구입 금액 유효성 테스트', () => {
  it.each([{ money: 1_000 }, { money: 100_000 }, { money: 9900_000 }])(
    `${LOTTO_PRICE}원 단위와 맞는 $money원을 입력할 시 에러가 발생하지 않는다.`,
    ({ money }) => {
      expect(() => {
        checkValidPurchase(money);
      }).not.toThrow();
    }
  );

  it.each([{ money: 999 }, { money: 999_009 }, { money: -1_000 }, { money: NaN }])(
    `${LOTTO_PRICE}원 단위와 맞지 않는 $money원을 입력할 시 에러가 발생한다.`,
    ({ money }) => {
      expect(() => {
        checkValidPurchase(money);
      }).toThrow(ERROR.PURCHASE.UNMATCHED_PRICE_PER_SHEET);
    }
  );
});
