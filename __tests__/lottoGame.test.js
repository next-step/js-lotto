import { getRank } from '../src/lottoGame.js'

describe('getRank 함수 테스트', () => {
  let winningNumbers
  let winningBonusNumber

  beforeEach(() => {
    winningNumbers = [1, 2, 3, 4, 5, 6]
    winningBonusNumber = 7
  })

  it('숫자 3개가 일치하면 5,000원을 받는다', () => {
    const ticketNumbers = [1, 2, 3, 14, 15, 16]
    const rank = getRank(ticketNumbers, winningNumbers, winningBonusNumber)

    expect(rank.price).toBe(5_000)
  })

  it('보너스 번호 제외 숫자 5개가 일치하면 1,500,000원을 받는다', () => {
    const ticketNumbers = [1, 2, 3, 4, 5, 16]
    const rank = getRank(ticketNumbers, winningNumbers, winningBonusNumber)

    expect(rank.price).toBe(1_500_000)
  })

  it('보너스 번호 포함 숫자 6개가 일치하면 30,000,000원을 받는다', () => {
    const ticketNumbers = [1, 2, 3, 4, 5, 7]
    const rank = getRank(ticketNumbers, winningNumbers, winningBonusNumber)

    expect(rank.price).toBe(30_000_000)
  })

  it('숫자 6개가 전부 일치하면 2,000,000,000원을 받는다', () => {
    const ticketNumbers = [1, 2, 3, 4, 5, 6]
    const rank = getRank(ticketNumbers, winningNumbers, winningBonusNumber)

    expect(rank.price).toBe(2_000_000_000)
  })
})