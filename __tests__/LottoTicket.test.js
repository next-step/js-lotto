import LottoTicket from '../src/js/domain/LottoTicket';
import { generateLottoNumberArray } from '../src/js/utils/LottoUtil';

describe('로또 티켓 기능 테스트', () => {
  it('6개의 번호를 가진다', () => {
    const lottoTicket = new LottoTicket(generateLottoNumberArray());

    expect(lottoTicket.lottoNumbers).toBeTruthy();
  });
  it('올바른 로또번호가 아닐 경우 에러를 발생한다.', () => {
    expect(() => new LottoTicket([1, 1, 2, 10, 30, 40])).toThrow();
  });
});
