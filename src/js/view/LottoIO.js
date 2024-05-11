import LottoTicket from '../domain/LottoTicket';

export function readLottoNumbers(lottoTicketInstance) {
  if (!(lottoTicketInstance instanceof LottoTicket)) {
    throw TypeError('로또가 아닙니다.');
  }
  if (lottoTicketInstance.lottoNumbers.length === 0) {
    throw TypeError('번호가 설정되지 않은 로또는 읽을 수 없습니다.');
  }
  return `[${lottoTicketInstance.lottoNumbers.toString().replace(/,/g, ', ')}]`;
}
