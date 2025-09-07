const LOTTO_RANK_TABLE = [
  { rank: 1, matchCount: 6, prize: 2_000_000_000 },
  { rank: 2, matchCount: 6, prize: 30_000_000, bonus: true },
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

export function getRankStatistics(results) {
  let totalWinnings = 0
  const stats = LOTTO_RANK_TABLE.map(rank => ({
    ...rank,
    count: 0,
  }))

  results.forEach(result => {
    totalWinnings += result.prize
    const rankIndex = stats.findIndex(rank =>
      rank.matchCount === result.matchCount && rank.bonus === result.bonus
    )

    if (rankIndex !== -1) {
      stats[rankIndex].count += 1
    }
  })

  return { stats: stats.reverse(), totalWinnings }
}
