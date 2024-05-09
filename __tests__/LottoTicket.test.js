import LottoTicket from '../src/js/domain/LottoTicket';
import Product from '../src/js/domain/Product';
import { generateLottoNumberArray } from '../src/js/utils/LottoUtil';

describe('로또 티켓 기능 테스트', () => {
  it('로또 티켓은 상품이다.', () => {
    expect(new LottoTicket()).toBeInstanceOf(Product);
  });
  it('6개의 번호를 가진다', () => {
    // given
    const lottoTicket = new LottoTicket();

    // when
    lottoTicket.lottoNumbers = generateLottoNumberArray();

    // then
    expect(lottoTicket.lottoNumbers).toBeTruthy();
  });
  it('올바른 로또번호가 아닐 경우 에러를 발생한다.', () => {
    const lottoTicket = new LottoTicket();

    expect(() => {
      lottoTicket.lottoNumbers = [1, 1, 2, 10, 30, 40];
    }).toThrow();
  });
});
