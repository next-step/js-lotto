const LOTTO_RANK_TABLE = [
  { rank: 1, matchCount: 6, prize: 2_000_000_000 },
  { rank: 2, matchCount: 5, prize: 30_000_000, bonus: true },
  { rank: 3, matchCount: 5, prize: 1_500_000 },
  { rank: 4, matchCount: 4, prize: 50_000 },
  { rank: 5, matchCount: 3, prize: 5_000 },
]

export function getRank(ticketNumbers, winningNumbers, winningBonusNumber) {
  const matchCount = ticketNumbers.filter(num => winningNumbers.includes(num)).length
  const hasBonusNumber = ticketNumbers.includes(winningBonusNumber)

  return LOTTO_RANK_TABLE.find(rank => {
    if (rank.bonus) {
      return hasBonusNumber && rank.matchCount === matchCount
    }

    return rank.matchCount === matchCount
  })
}

export function calculateProfitRate(purchaseAmount, totalWinnings) {
  const rate = (totalWinnings / purchaseAmount) * 100

  return Math.round(rate * 100) / 100
}