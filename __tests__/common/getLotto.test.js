import { LOTTO } from '../../src/domains/common/constants';
import { getLotto } from '../../src/domains/common/utils';

describe('getLotto 관련 함수 테스트', () => {
  describe('보유한 로또 숫자를 매개 변수를 통해서 입력했을 때', () => {
    test('중복된 숫자가 있으면 오류를 던진다.', () => {
      expect(() => {
        getLotto([1, 2, 3, 5, 5, 6]);
      }).toThrow();
    });

    test('모든 숫자들 중 로또 범위(1 ~ 45)에 포함 안되어 있으면 오류를 던진다.', () => {
      expect(() => {
        getLotto([1, 2, 3, 4, 5, 51]);
      }).toThrow();
    });
  });

  describe('값이 출력되었을 떄', () => {
    let lotto;

    beforeEach(() => (lotto = getLotto([1, 2, 3, 4, 5, 6])));
    test('6개의 일반 숫자가 나와야 한다.', () => {
      expect(lotto.length).toBe(LOTTO.SIZE);
    });

    test('중복된 숫자가 나와서는 안된다.', () => {
      const filteredDuplicate = [...new Set(lotto)];

      expect(filteredDuplicate.length).toBe(LOTTO.SIZE);
    });
  });
});
