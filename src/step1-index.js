import { readLineAsync } from './utils/readlineAsync.js'
import { getTicket, LOTTO_PRICE } from './lotto.js'
import { calculateProfitRate, getRank, LOTTO_RANK_TABLE } from './lottoGame.js'
import { printProfit, printResults, printTicket } from './lottoPrint.js'

async function start() {
  const tickets = await getTickets()
  printTicket(tickets)

  const { winningNumbers, winningBonusNumber } = await getWinningNumber()
  const { stats, totalWinnings } = getStatistics(tickets, winningNumbers, winningBonusNumber)
  printResults(stats, totalWinnings)

  const profitRate = calculateProfitRate(tickets.length * LOTTO_PRICE, totalWinnings)
  printProfit(profitRate)
}

async function getTickets() {
  const purchaseAmount = await readLineAsync('구입 금액을 입력해 주세요. ')
  return getTicket(purchaseAmount)
}

async function getWinningNumber() {
  let winningNumbers = await readLineAsync('당첨 번호를 입력해 주세요. ')
  winningNumbers = winningNumbers.split(',').map(num => Number(num.trim()))

  const winningBonusNumber = await readLineAsync('보너스 번호를 입력해 주세요. ')

  return { winningNumbers, winningBonusNumber: Number(winningBonusNumber) }
}

function getStatistics(tickets, winningNumbers, winningBonusNumber) {
  const results = tickets.map(ticket => getRank(ticket, winningNumbers, winningBonusNumber)).filter(Boolean)

  return getRankStatistics(results)
}

function getRankStatistics(results) {
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

await start()