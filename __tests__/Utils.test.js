import { calcROI, comma } from '../src/js/utils';

describe('', () => {
  it('수익률을 출력한다.', () => {
    // given
    const netReturn = 5_000;
    const investmentCost = 8_000;
    // when
    const rateOfReturn = calcROI(netReturn, investmentCost);

    // then
    expect(rateOfReturn).toBe(62.5);
  });
  it('금액에 콤마(,)를 추가합니다.', () => {
    // given
    const money = 1_000_000;

    // when
    const output = comma(money);

    // then
    expect(output).toBe('1,000,000');
  });
});
