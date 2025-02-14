import { getRandomLottoNumber } from '../../src/domains/common/utils';

describe('getRandomLottoNumber 관련 함수 테스트', () => {
  describe('무작위로 숫자를 돌렸을 때, 로또 범위(1 ~ 45)인', () => {
    test('"1"을 반환한다.', () => {
      const lottoNumber = getRandomLottoNumber(1);

      expect(lottoNumber).toBe(1);
    });

    test('"45"를 반환한다.', () => {
      const lottoNumber = getRandomLottoNumber(45);

      expect(lottoNumber).toBe(45);
    });

    test('"0"를 반환할 수 없으며 오류가 난다.', () => {
      expect(() => {
        getRandomLottoNumber(0);
      }).toThrow();
    });

    test('"46"를 반환할 수 없으며 오류가 난다.', () => {
      expect(() => {
        getRandomLottoNumber(46);
      }).toThrow();
    });
  });

  describe('수동(매개 변수)으로 돌렸을 때,', () => {
    test('글자를 넣으면 오류가 난다.', () => {
      expect(() => {
        getRandomLottoNumber('글자');
      }).toThrow('로또 번호를 생성하면서 문제가 생겼습니다.');
    });

    test('소수점을 넣으면 오류가 난다.', () => {
      expect(() => {
        getRandomLottoNumber(3.14);
      }).toThrow();
    });

    test('음수를 넣으면 오류가 난다.', () => {
      expect(() => {
        getRandomLottoNumber(-1);
      }).toThrow();
    });
  });
});
