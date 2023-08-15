import LottoMachine, {
  validateLottoNumber,
  validateLottoNumbers,
} from './LottoMachine.js';
import { RULES } from './constants.js';

describe('LottoMachine', () => {
  describe('로또 구매', () => {
    it(`${RULES.LOTTO_PRICE} 단위로 로또를 발행한다.`, () => {
      const lottoMachine = new LottoMachine();

      [1_000, 2_000, 3_000, 4_000].forEach(money => {
        lottoMachine.purchaseLottos(money);

        expect(lottoMachine.lottos.length).toBe(money / RULES.LOTTO_PRICE);
      });
    });
  });

  describe('로또 당첨 번호 설정', () => {
    it('당첨번호 6자리와 보너스 번호 1자리를 숫자로 설정한다.', () => {
      const lottoMachine = new LottoMachine();

      lottoMachine.setWinNumbers([1, 2, 3, 4, 5, 6], 7);

      expect(lottoMachine.winNumbers.length).toBe(6);
      expect(typeof lottoMachine.bonusNumber).toBe('number');
    });

    it(`입력한 각 번호는 ${RULES.LOTTO_NUMBERS_RANGE[1]} 이하의 자연수이다.`, () => {
      expect(() => validateLottoNumber(0.1)).toThrow();
      expect(() => validateLottoNumber(-1)).toThrow();
      expect(() => validateLottoNumber(0)).toThrow();
      expect(() => validateLottoNumber(1)).not.toThrow();
      expect(() => validateLottoNumber(45)).not.toThrow();
      expect(() => validateLottoNumber(46)).toThrow();
    });
    it('입력한 당첨 번호와 보너스 번호는 중복되지않아야한다', () => {
      expect(() => validateLottoNumbers([1, 2, 3, 4, 5, 6, 7])).not.toThrow();
      expect(() => validateLottoNumbers([1, 2, 3, 4, 5, 6, 6])).toThrow();
    });
  });
});
