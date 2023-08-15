import Lotto from './Lotto.js';
import { RULES } from './constants.js';

describe('Lotto', () => {
  describe('로또 번호 생성', () => {
    it(`각 로또 번호는 ${RULES.LOTTO_NUMBERS_RANGE[1]} 이하의 자연수이다.`, () => {
      const lottoNumbers = new Lotto().numbers;

      lottoNumbers.forEach(number => {
        expect(number).toBeGreaterThanOrEqual(RULES.LOTTO_NUMBERS_RANGE[0]);
        expect(number).toBeLessThanOrEqual(RULES.LOTTO_NUMBERS_RANGE[1]);
      });
    });

    it('생성된 로또 번호는 중복되지않는다.', () => {
      const lottoNumbers = new Lotto().numbers;

      expect(lottoNumbers.length).toBe([...new Set(lottoNumbers)].length);
    });

    it(`${RULES.LOTTO_NUMBERS_LENGTH}개의 로또 번호를 가진다.`, () => {
      const lotto = new Lotto();

      expect(lotto.numbers.length).toBe(RULES.LOTTO_NUMBERS_LENGTH);
    });
  });
});
