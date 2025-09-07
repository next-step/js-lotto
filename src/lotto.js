import { LottoError } from './errors/lottoError.js'

const LOTTO_PRICE = 1000
const LOTTO_NUMBERS_LENGTH = 6

export function getTicket(money) {
  if (!money || money < LOTTO_PRICE) {
    throw LottoError.TicketPriceTooLow()
  }

  return Math.floor(money / LOTTO_PRICE)
}

export function generateLottoNumber() {
  const numbers = new Set()

  while (numbers.size < LOTTO_NUMBERS_LENGTH) {
    const num = Math.floor(Math.random() * 45) + 1
    numbers.add(num)
  }

  return Array.from(numbers)
}