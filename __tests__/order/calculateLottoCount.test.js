import { calculateLottoCount } from '../../src/domains/order/utils';

describe('calculateLottoCount 관련 함수', () => {
  describe('한 장당 1,000원이라고 가정했을 때', () => {
    test.each([
      ['5,000원은 로또 5장을 줘야한다.', 5000, 5],
      ['10,000원은 로또 10장을 줘야한다.', 10000, 10],
      ['12,300원은 로또 12장을 줘야한다.', 12300, 12],
    ])('%s', (_, amount, count) => {
      expect(calculateLottoCount(amount)).toBe(count);
    });
  });
});
