import LottoTicket from '../domain/LottoTicket';
import { calcROI, comma } from '../utils';
import { isValidLottoNumberArray } from '../utils/LottoUtil';
import { ERROR_MESSAGE } from '../constants';

export function readLottoNumbers(lottoTicketInstance) {
  if (!(lottoTicketInstance instanceof LottoTicket)) {
    throw TypeError(ERROR_MESSAGE.REQUIRE_LOTTO_INSTANCE);
  }
  if (!isValidLottoNumberArray(lottoTicketInstance.lottoNumbers)) {
    throw TypeError(ERROR_MESSAGE.REQUIRE_LOTTO_NUMBERS);
  }
  return `[${lottoTicketInstance.lottoNumbers.toString().replace(/,/g, ', ')}]`;
}

/**
 * ROI란 투자 대비 수익률을 의미합니다.(Return On Investment)
 * ROI = 순이익 / 투자비용 * 100
 */
export function readROI(netReturn, investmentCost) {
  return `${calcROI(netReturn, investmentCost).toFixed(1)}%`;
}

export function readMatchLottoNumber({ matchNumber, price, matchCount }) {
  return `${matchNumber}개 일치 (${comma(price)}원) - ${matchCount}개`;
}

export function writeLottoNumbers(input) {
  const lottoNumbers = input
    .replace(/\s/g, '')
    .split(',')
    .map((number) => Number(number));

  if (!isValidLottoNumberArray(lottoNumbers)) {
    throw TypeError(ERROR_MESSAGE.INVALID_LOTTO_FORMAT);
  }

  return lottoNumbers;
}
