export function printTicket(tickets) {
  console.log(`${tickets.length}개를 구매했습니다.`)
  tickets.forEach(ticket => console.log(ticket))
}

export function printResults(stats, totalWinnings) {
  if (!totalWinnings) {
    console.log('낙첨되었습니다.')
    return
  }

  console.log('당첨 통계')
  console.log('--------------------')

  stats.forEach(({ matchCount, prize, bonus, count }) => {
    console.log(`${matchCount}개 일치${bonus ? ', 보너스 볼 일치': ''} (${prize.toLocaleString()}원) - ${count.toLocaleString()}개`)
  })
}

export function printProfit(profitRate) {
  console.log(`총 수익률은 ${profitRate.toLocaleString()}% 입니다.`)
}