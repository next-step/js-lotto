import { readLineAsync } from './utils/readlineAsync.js'
import { getTicket, LOTTO_PRICE } from './lotto.js'
import { calculateProfitRate, getRank, getRankStatistics } from './lottoGame.js'
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

await start()