import LottoMachine from './LottoMachine.js';
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
});
