import {
  DUMMY_AMOUNT,
  DUMMY_INCORRECT_AMOUNT,
  DUMMY_PURCHASABLE_AMOUNT,
  DUMMY_NOT_PURCHASABLE_AMOUNT
} from './constants';
import { ERROR_MESSAGE, LOTTO_PRICE } from '../src/domain/constants/index.js';
import { LottoCustomer, LottoSeller, LottoOrganizer } from '../src/domain/models/index';

let lottoSeller = null;

beforeEach(() => {
  lottoSeller = new LottoSeller(LottoOrganizer.lottoPrice());
});

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
  test.each(DUMMY_PURCHASABLE_AMOUNT)(
    `로또 구매자가 갖는 금액($amount)이 로또 가격(${LOTTO_PRICE})보다 같거나 크다면 구입금액만큼 로또를 구매한다.`,
    ({ amount }) => {
      const lottoCustomer = new LottoCustomer(amount);
      lottoCustomer.buyAutoLottoTicket(lottoSeller);
      expect(lottoCustomer.lottoTickets).toHaveLength(lottoSeller.sellCount);
    }
  );

  test.each(DUMMY_NOT_PURCHASABLE_AMOUNT)(
    `로또 구매자가 갖는 금액($amount)이 로또 가격(${LOTTO_PRICE})보다 작다면 오류가 발생한다.`,
    ({ amount }) => {
      const lottoCustomer = new LottoCustomer(amount);
      expect(() => {
        lottoCustomer.buyAutoLottoTicket(lottoSeller);
      }).toThrowError(ERROR_MESSAGE.NOT_ENOUGH_AMOUNT);
    }
  );
});
