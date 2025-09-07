import { calculateProfitRate, getRank } from '../src/lottoGame.js'

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

    expect(rank.prize).toBe(5_000)
  })

  it('보너스 번호 제외 숫자 5개가 일치하면 1,500,000원을 받는다', () => {
    const ticketNumbers = [1, 2, 3, 4, 5, 16]
    const rank = getRank(ticketNumbers, winningNumbers, winningBonusNumber)

    expect(rank.prize).toBe(1_500_000)
  })

  it('보너스 번호 포함 숫자 6개가 일치하면 30,000,000원을 받는다', () => {
    const ticketNumbers = [1, 2, 3, 4, 5, 7]
    const rank = getRank(ticketNumbers, winningNumbers, winningBonusNumber)

    expect(rank.prize).toBe(30_000_000)
  })

  it('숫자 6개가 전부 일치하면 2,000,000,000원을 받는다', () => {
    const ticketNumbers = [1, 2, 3, 4, 5, 6]
    const rank = getRank(ticketNumbers, winningNumbers, winningBonusNumber)

    expect(rank.prize).toBe(2_000_000_000)
  })
})

describe('calculateProfitRate 함수 테스트', () => {
  it('구매 금액과 당첨금으로 총 수익률을 계산한다', () => {
    const purchaseAmount = 10_000
    const totalWinnings = 50_000

    expect(calculateProfitRate(purchaseAmount, totalWinnings)).toBe(500)
  })

  it('수익률은 소수점 셋째 자리에서 반올림하여 둘째 자리까지만 유지한다', () => {
    const purchaseAmount = 30_000
    const totalWinnings = 5_000

    expect(calculateProfitRate(purchaseAmount, totalWinnings)).toBe(16.67)
  })
})