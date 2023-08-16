import ERROR from '../../../src/js/constants/error.js';
import { LottoMachine } from '../../../src/js/domain/index.js';

describe('로또 머신 예외 테스트', () => {
  it.each([990, 9, 1001, 99991900, NaN, 0])('단위와 맞지 않는 금액을 입력할 시 에러가 발생한다.', (money) => {
    expect(() => {
      const lottoMachine = new LottoMachine();

      lottoMachine.buy(money);
    }).toThrow(ERROR.PURCHASE.UNMATCHED_PRICE_PER_SHEET);
  });
});
