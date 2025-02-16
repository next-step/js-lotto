import { calculateLottoCount } from '../../src/domains/order/utils';

describe('calculateLottoCount 관련 함수', () => {
  describe('한 장당 1,000원이라고 가정했을 떄', () => {
    test('5,000원은 로또 5장을 줘야한다.', () => {
      const lottoCount = calculateLottoCount(5000);

      expect(lottoCount).toBe(5);
    });

    test('10,000원은 로또 10장을 줘야한다.', () => {
      const lottoCount = calculateLottoCount(10000);

      expect(lottoCount).toBe(10);
    });

    test('12,300원은 로또 12장을 줘야한다.', () => {
      const lottoCount = calculateLottoCount(12300);

      expect(lottoCount).toBe(12);
    });
  });
});
