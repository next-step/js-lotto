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

  it('로또 금액은 1,000원이다.', () => {
    // given
    const lottoTicket = new LottoTicket();

    // when
    const price = lottoTicket.price;

    // then
    expect(price).toBe(1_000);
  });

  describe('당첨 금액 조회', () => {
    it.each([
      [[1, 2, 3, 4, 5, 6], 2_000_000_000],
      [[1, 2, 3, 4, 5, 7], 30_000_000],
      [[1, 2, 3, 4, 5, 10], 1_500_000],
      [[1, 2, 3, 4, 10, 11], 50_000],
      [[1, 2, 3, 10, 11, 12], 5_000],
      [[1, 2, 10, 11, 12, 13], 0],
      [[10, 11, 12, 13, 14, 15], 0],
    ])('%s 의 당첨금액은 %s 입니다.', (lottoNumbers, expected) => {
      // given
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusWinningNumber = 7;
      const winningAmounts = [
        2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0,
      ];
      const lottoTicket = new LottoTicket();
      lottoTicket.lottoNumbers = lottoNumbers;

      // when
      const result = lottoTicket.calcWinningAmount({
        winningNumbers,
        winningAmounts,
        bonusWinningNumber,
      });

      // then
      expect(result).toBe(expected);
    });
  });

  describe('당첨 등수 조회', () => {
    it.each([
      [[1, 2, 3, 4, 5, 6], 1],
      [[1, 2, 3, 4, 5, 7], 2],
      [[1, 2, 3, 4, 5, 10], 3],
      [[1, 2, 3, 4, 10, 11], 4],
      [[1, 2, 3, 10, 11, 12], 5],
      [[1, 2, 10, 11, 12, 13], -1],
      [[10, 11, 12, 13, 14, 15], -1],
    ])('%s는 %s등 입니다. (-1: 낙첨)', (lottoNumbers, expected) => {
      // given
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusWinningNumber = 7;

      const lottoTicket = new LottoTicket();
      lottoTicket.lottoNumbers = lottoNumbers;

      // when
      const result = lottoTicket.calcWinningRank(
        winningNumbers,
        bonusWinningNumber
      );

      // then
      expect(result).toBe(expected);
    });
  });
});
