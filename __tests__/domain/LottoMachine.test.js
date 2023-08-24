import ERROR from '../../src/js/constants/error.js';
import { LottoMachine } from '../../src/js/domain/index.js';

describe('로또 머신 테스트', () => {
  it.each([
    { money: 1_000, sheets: 1 },
    { money: 10_000, sheets: 10 },
    { money: 30_000, sheets: 30 },
  ])('$money원을 입력하면 장당 가격에 비례한 $sheets장의 로또를 발급받는다.', ({ money, sheets }) => {
    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.buy(money);

    expect(lottos.length).toBe(sheets);
  });

  it.each([1_100, 100, -1_000, '천원'])('1000원 단위가 아닌 값으로 구매할 시 에러를 발생시킨다.', (money) => {
    expect(() => {
      const lottoMachine = new LottoMachine();
      lottoMachine.buy(money);
    }).toThrow(ERROR.UNMATCHED_PRICE_PER_SHEET(LottoMachine.PRICE));
  });
});
