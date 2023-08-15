import LottoMachine from '../src/js/domain/LottoMachine';

describe('로또 머신 테스트', () => {
  it.each([
    [1_000, 1],
    [10_000, 10],
    [30_000, 30],
  ])('금액을 입력하면 장당 가격에 비례한 로또를 발급받는다.', (money, sheets) => {
    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.buy(money);

    expect(lottos.length).toBe(sheets);
  });
});
