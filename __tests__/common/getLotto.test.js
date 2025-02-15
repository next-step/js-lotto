import { LOTTO_LENGTH } from '../../src/domains/common/constants';
import { getLotto } from '../../src/domains/common/utils';

describe('getLotto 관련 함수 테스트', () => {
  describe('로또 1장을 뽑을 때', () => {
    test('6개의 일반 숫자가 나와야 한다.', () => {
      const lotto = getLotto();

      expect(lotto.length).toBe(LOTTO_LENGTH);
    });

    test('중복된 숫자가 나와서는 안된다.', () => {
      const lotto = getLotto();

      const filteredDuplicate = [...new Set(lotto)];

      expect(filteredDuplicate.length).toBe(LOTTO_LENGTH);
    });

    test('왼쪽 기준으로 숫자가 오름차순으로 정렬되어야 한다.', () => {
      const lotto = getLotto();

      const isAscendOrder = !lotto.some((value, index, arr) => {
        if (index === 0) return false;
        return !(value > arr[index - 1]);
      });

      expect(isAscendOrder).toBe(true);
    });
  });
});
