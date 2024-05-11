import LottoTicket from '../src/js/domain/LottoTicket';
import { readLottoNumbers } from '../src/js/view/LottoIO';

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
  it('당첨 통계를 출력한다.', () => {
    // given
    // when
    // then
  });
  it('수익률을 출력한다.', () => {
    // given
    // when
    // then
  });
});
