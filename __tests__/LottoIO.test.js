import LottoTicket from '../src/js/domain/LottoTicket';
import {
  readLottoNumbers,
  readMatchLottoNumber,
  readROI,
} from '../src/js/view/LottoIO';

describe('입출력 (로또) 기능 테스트', () => {
  it('로또 번호를 출력한다.', () => {
    // given
    const lottoTicket = new LottoTicket();
    lottoTicket.lottoNumbers = [1, 2, 3, 4, 5, 6];

    // when
    const output = readLottoNumbers(lottoTicket);

    // then
    expect(output).toBe('[1, 2, 3, 4, 5, 6]');
  });
  it('수익률을 출력한다.', () => {
    // given
    const netReturn = 5_000;
    const investmentCost = 8_000;
    // when
    const rateOfReturn = readROI(netReturn, investmentCost);

    // then
    expect(rateOfReturn).toBe('62.5%');
  });
  it('통계 출력 형식이 맞는지 확인한다. n개 일치 (n원) - n개', () => {
    // given
    const matchNumber = 3;
    const price = 5_000;
    const matchCount = 1;

    // when
    const output = readMatchLottoNumber({
      matchNumber,
      price,
      matchCount,
    });

    // then
    expect(output).toBe('3개 일치 (5,000원) - 1개');
  });
});
