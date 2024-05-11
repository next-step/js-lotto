import LottoTicket from '../domain/LottoTicket';
import { calcROI, comma } from '../utils';

export function readLottoNumbers(lottoTicketInstance) {
  if (!(lottoTicketInstance instanceof LottoTicket)) {
    throw TypeError('로또가 아닙니다.');
  }
  if (lottoTicketInstance.lottoNumbers.length === 0) {
    throw TypeError('번호가 설정되지 않은 로또는 읽을 수 없습니다.');
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
