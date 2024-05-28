import LottoTicket from '../src/js/domain/LottoTicket';
import {
  readLottoNumbers,
  readMatchLottoNumber,
  readROI,
} from '../src/js/view/LottoIO';

const context = describe;

describe('입출력 로또 기능 테스트', () => {
  context('로또 번호 배열 [1, 2, 3, 4, 5, 6]가 주어질 때', () => {
    it('문자열 "[1, 2, 3, 4, 5, 6]"와 같은지 확인한다.', () => {
      // given
      const lottoTicket = new LottoTicket([1, 2, 3, 4, 5, 6]);

      // when
      const output = readLottoNumbers(lottoTicket);

      // then
      expect(output).toBe('[1, 2, 3, 4, 5, 6]');
    });
  });

  context('로또 번호 배열 [6, 2, 3, 5, 4, 1]가 주어질 때', () => {
    it('문자열 "[1, 2, 3, 4, 5, 6]"와 같은지 확인한다.', () => {
      // given
      const lottoTicket = new LottoTicket([6, 2, 3, 5, 4, 1]);

      // when
      const output = readLottoNumbers(lottoTicket);

      // then
      expect(output).toBe('[1, 2, 3, 4, 5, 6]');
    });
  });

  context('순수익 5_000와 투자비용 8_000으로 값이 주어질 때', () => {
    it('수익률은 62.5이다.', () => {
      // given
      const profit = 5_000;
      const investmentCost = 8_000;
      // when
      const rateOfReturn = readROI(profit, investmentCost);

      // then
      expect(rateOfReturn).toBe('62.5%');
    });
  });

  context('통계 출력 형식이 맞는지 확인한다. n개 일치 (n원) - n개', () => {
    it('문자열 3개 일치 (5,000원) - 1개 로 출력된다.', () => {
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
});
