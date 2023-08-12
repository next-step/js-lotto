import Lotto from './Lotto.js';
import { RULES } from './constants.js';

describe('Lotto', () => {
  describe('로또 번호 생성', () => {
    it(`각 로또 번호는 ${RULES.LOTTO_NUMBERS_RANGE[1]} 이하의 자연수이다.`, () => {
      const lottoNumbers = new Lotto().generateLottoNumbers();

      lottoNumbers.forEach(number => {
        expect(number).toBeGreaterThanOrEqual(RULES.LOTTO_NUMBERS_RANGE[0]);
        expect(number).toBeLessThanOrEqual(RULES.LOTTO_NUMBERS_RANGE[1]);
      });
    });

    it('생성된 로또 번호는 중복되지않는다.', () => {
      const lottoNumbers = new Lotto().generateLottoNumbers();

      expect(lottoNumbers.length).toBe([...new Set(lottoNumbers)].length);
    });

    it(`생성된 로또 번호는 총 ${RULES.LOTTO_NUMBERS_LENGTH + 1}개이다`, () => {
      const lottoNumbers = new Lotto().generateLottoNumbers();

      expect(lottoNumbers.length).toBe(RULES.LOTTO_NUMBERS_LENGTH + 1);
    });
  });
});
