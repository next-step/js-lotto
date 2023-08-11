import Exchange from '../src/js/domain/Exchange.js';

describe('교환소 테스트', () => {
  it('수익률을 계산한다', () => {
    const rateOfReturn = Exchange.calculateRateOfReturn(10000, 1000);

    expect(rateOfReturn).toBe(10);
  });
});
