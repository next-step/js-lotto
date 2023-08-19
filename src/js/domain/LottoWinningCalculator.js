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

  // FIXME: 로직 간소화
  // 등수를 계산하는 메서드
  #calculateRank(statuses) {
    const ranks = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    }

    statuses.forEach((status) => {
      const { matchSelectedNums, matchExtraNum } = status

      if (matchSelectedNums === 6 && matchExtraNum === 1) {
        ranks[6]++
      } else if (matchSelectedNums === 5 && matchExtraNum === 1) {
        ranks[5.5]++
      } else if (matchSelectedNums === 5) {
        ranks[5]++
      } else if (matchSelectedNums === 4) {
        ranks[4]++
      } else if (matchSelectedNums === 3) {
        ranks[3]++
      }
    })

    return ranks
  }

  // FIXME: 로직 간소화
  // 수익률을 계산하는 메서드
  #calculateProfitRate(statuses, ranks) {
    const prizeMoney = {
      3: 5000,
      4: 50000,
      5: 1500000,
      5.5: 30000000,
      6: 2000000000,
    }

    let totalPrize = 0
    for (const rank in ranks) {
      totalPrize += prizeMoney[rank] * ranks[rank]
    }

    const totalCost = 1000 * statuses.length
    const profitRate = (totalPrize / totalCost) * 100

    return profitRate
  }

  #setResult(ranks, profitRate) {
    this.#result = {
      3: ranks[3] || 0,
      4: ranks[4] || 0,
      5: ranks[5] || 0,
      5.5: ranks[5.5] || 0,
      6: ranks[6] || 0,
      profitRate: profitRate,
    }
  }

  get result() {
    return this.#result
  }
}

export default LottoWinningCalculator
