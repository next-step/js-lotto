import { LottoError } from './errors/lottoError.js'

const LOTTO_PRICE = 1000

export function getTicket(money) {
  if (!money || money < LOTTO_PRICE) {
    throw LottoError.TicketPriceTooLow()
  }

  return Math.floor(money / LOTTO_PRICE)
}