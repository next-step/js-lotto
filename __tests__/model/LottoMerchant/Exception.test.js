import { PRICE_PER_LOTTO } from '../../../src/step1/constants/lotto';
import { ERROR_MESSAGE } from '../../../src/step1/constants/message';
import { LottoError } from '../../../src/step1/errors';
import { LottoMerchant } from '../../../src/step1/model';

describe('LottoMerchant 관련 예외 테스트', () => {
  test.each([
    { receivedAmount: 1200 },
    { receivedAmount: 1540 },
    { receivedAmount: 2234 },
    { receivedAmount: 12934 },
    { receivedAmount: 24300 },
  ])('로또 판매자가 받은 $receivedAmount원은 잔돈이 있어 에러가 발생된다.', ({ receivedAmount }) => {
    // given - when
    const createLottoMerchant = () => new LottoMerchant(receivedAmount);
    // then
    expect(() => createLottoMerchant()).toThrow(LottoError);
    expect(() => createLottoMerchant()).toThrow(ERROR_MESSAGE.NO_CHANGES);
  });
  test.each([
    { receivedAmount: 0 },
    { receivedAmount: 9 },
    { receivedAmount: 15 },
    { receivedAmount: 40 },
    { receivedAmount: 600 },
    { receivedAmount: 230 },
    { receivedAmount: 442 },
  ])(
    `로또 판매자가 받은 $receivedAmount원은 ${PRICE_PER_LOTTO}원 이하이므로 에러가 발생된다.`,
    ({ receivedAmount }) => {
      // given - when
      const createLottoMerchant = () => new LottoMerchant(receivedAmount);
      // then
      expect(() => createLottoMerchant()).toThrow(LottoError);
      expect(() => createLottoMerchant()).toThrow(ERROR_MESSAGE.GREATER_THEN_PRICE_PER_LOTTO);
    },
  );
});
