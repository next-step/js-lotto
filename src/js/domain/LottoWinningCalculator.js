import { LOTTO_PRIZE, LOTTO_RANKS } from '../../constants/conditions.js'

class LottoWinningCalculator {
  #result

  constructor() {
    this.#result = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
      profitRate: 0,
    }
  }

  calculate(lottoStatuses) {
    const ranks = this.#calculateRank(lottoStatuses)
    const profitRate = this.#calculateProfitRate(lottoStatuses, ranks)
    this.#setResult(ranks, profitRate)
  }

  #calculateRank(statuses) {
    const ranks = Object.assign(LOTTO_RANKS)

    statuses.forEach((status) => {
      const rank = this.#getRank(status)

      if (rank !== null) {
        ranks[rank]++
      }
    })

    return ranks
  }

  // 수익률을 계산하는 메서드
  #calculateProfitRate(statuses, ranks) {
    const totalPofit = Object.keys(ranks).reduce(
      (acc, rank) => acc + LOTTO_PRIZE[rank] * ranks[rank],
      0,
    )

    const totalCost = 1000 * statuses.length

    return (totalPofit / totalCost) * 100
  }

  #setResult(ranks, profitRate) {
    this.#result = {
      3: ranks[3] ?? 0,
      4: ranks[4] ?? 0,
      5: ranks[5] ?? 0,
      5.5: ranks[5.5] ?? 0,
      6: ranks[6] ?? 0,
      profitRate: profitRate,
    }
  }

  #getRank({ matchSelectedNums, matchExtraNum }) {
    if (matchSelectedNums === 6 && matchExtraNum === 1) return 6
    if (matchSelectedNums === 5 && matchExtraNum === 1) return 5.5
    if (matchSelectedNums === 5) return 5
    if (matchSelectedNums === 4) return 4
    if (matchSelectedNums === 3) return 3
    return null
  }

  get result() {
    return this.#result
  }
}

export default LottoWinningCalculator
