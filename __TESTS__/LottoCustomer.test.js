import { DUMMY_AMOUNT, DUMMY_INCORRECT_AMOUNT } from './constants';
import { ERROR_MESSAGE } from '../src/domain/constants/index';
import { LottoCustomer } from '../src/domain/classes/index';

describe('로또 구매 테스트', () => {
  test.each(DUMMY_AMOUNT)('로또 구매자가 갖는 금액은 반드시 양수이어야 한다.($amount)', ({ amount }) => {
    const lottoCustomer = new LottoCustomer(amount);
    expect(lottoCustomer.amount).toBeGreaterThan(0);
  });

  test.each(DUMMY_INCORRECT_AMOUNT)(
    '로또 구매자가 갖는 금액이 양수가 아니면 오류가 발생한다.($amount)',
    ({ amount }) => {
      expect(() => {
        new LottoCustomer(amount);
      }).toThrowError(ERROR_MESSAGE.INVALID_AMOUNT_BY_NOT_POSITIVE_AMOUNT);
    }
  );
});
