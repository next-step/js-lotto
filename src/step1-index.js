import { readLineAsync } from './utils/readlineAsync.js'
import { getTicket, LOTTO_PRICE } from './lotto.js'
import { calculateProfitRate, getRank, LOTTO_RANK_TABLE } from './lottoGame.js'

async function start() {
  const purchaseAmount = await readLineAsync('구입 금액을 입력해 주세요. ')
  const tickets = getTicket(purchaseAmount)

  printTicket(tickets)

  let winningNumbers = await readLineAsync('당첨 번호를 입력해 주세요. ')
  winningNumbers = winningNumbers.split(',').map(num => Number(num.trim()))
  const bonusNumber = await readLineAsync('보너스 번호를 입력해 주세요. ')

  printResults(tickets, winningNumbers, bonusNumber)
}

function printTicket(tickets) {
  console.log(`${tickets.length}개를 구매했습니다.`)
  tickets.forEach(ticket => console.log(ticket))
}

function printResults(tickets, winningNumbers, bonusNumber) {
  const results = tickets.map(ticket => getRank(ticket, winningNumbers, bonusNumber)).filter(Boolean)

  if (!results?.length) {
    console.log('낙첨되었습니다.')
    return
  }

  const stats = getRankStatistics(results)

  console.log('당첨 통계')
  console.log('--------------------')

  let totalWinnings = 0
  stats.forEach(({ matchCount, prize, bonus, count }) => {
    totalWinnings += prize * count
    console.log(`${matchCount}개 일치${bonus ? ', 보너스 볼 일치': ''} (${prize.toLocaleString()}원) - ${count.toLocaleString()}개`)
  })

  console.log(`총 수익률은 ${calculateProfitRate(tickets.length * LOTTO_PRICE, totalWinnings)}% 입니다.`)
}

function getRankStatistics(results) {
  const stats = LOTTO_RANK_TABLE.map(rank => ({
    ...rank,
    count: 0,
  }))

  results.forEach(result => {
    const rankIndex = stats.findIndex(rank =>
      rank.matchCount === result.matchCount && rank.bonus === result.bonus
    )

    if (rankIndex !== -1) {
      stats[rankIndex].count += 1
    }
  })

  return stats.reverse()
}

await start()