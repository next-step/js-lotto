import {
  LOTTO_PER_PRICE,
  LOTTO_TRY_COUNT,
  LOTTO_NUMBERS,
} from '../src/js/consts';
import { lottoModule } from '../src/js/modules/lottoModule';

describe('lottoModule', () => {
  describe('금액에 맞춰 로또 갯수를 계산한다.', () => {
    it('금액에 맞춰 구매가능한 로또 갯수를 계산한다.', () => {
      const { getTicketNumbersOfBuying } = lottoModule('1000');
      expect(getTicketNumbersOfBuying(LOTTO_PER_PRICE)).toBe(1);
      expect(getTicketNumbersOfBuying(LOTTO_PER_PRICE, '2000')).toBe(2);
    });
    it('중복되지 않은 수 6개를 발급할 수 있다.', () => {
      const { getRandomLottoNumbers } = lottoModule();
      const selectedLottoNumbers = getRandomLottoNumbers(
        LOTTO_TRY_COUNT,
        LOTTO_NUMBERS
      );
      expect(selectedLottoNumbers.length).toBe(LOTTO_TRY_COUNT);
      selectedLottoNumbers.map((number) => {});
    });
  });
});
