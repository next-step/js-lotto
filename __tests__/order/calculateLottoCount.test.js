import { calculateLottoCount } from '../../src/domains/order/utils';

describe('calculateLottoCount 관련 함수', () => {
  describe('입력한 구입 금액이', () => {
    test('-1000이면 오류가 띄워야 한다.', () => {
      expect(() => {
        calculateLottoCount(-1000);
      }).toThrow();
    });

    test('3.14이면 오류를 띄워야 한다.', () => {
      expect(() => {
        calculateLottoCount(3.14);
      }).toThrow();
    });

    test('0이면 오류를 띄워야 한다.', () => {
      expect(() => {
        calculateLottoCount(0);
      }).toThrow();
    });

    test('공백이면 오류를 띄워야 한다.', () => {
      expect(() => {
        calculateLottoCount('');
      }).toThrow();
    });
  });

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
