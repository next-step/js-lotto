import { getTicket } from '../src/lotto.js'
import { LottoError } from '../src/errors/lottoError.js'

describe('getTicket 함수 테스트', () => {
  it('1,000원을 입력하면 1장을 발급한다', () => {
    const money = 1000

    expect(getTicket(money)).toBe(1)
  })

  it('1,000원 단위로 티켓을 발급하며, 2,500원을 입력하면 2장을 발급한다', () => {
    const money = 2500

    expect(getTicket(money)).toBe(2)
  })

  it('1,000원 미만은 에러를 발생시킨다', () => {
    const money = 900

    expect(() => getTicket(money)).toThrow(LottoError.TicketPriceTooLow())
  })

  it('금액을 입력하지 않으면 에러를 발생시킨다', () => {
    expect(() => getTicket()).toThrow(LottoError.TicketPriceTooLow())
  })
})