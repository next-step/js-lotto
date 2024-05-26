import { PRIZE } from "./Prize";

class LottoStats {
  #stats = {
    [PRIZE.FIRST.rank]: 0,
    [PRIZE.SECOND.rank]: 0,
    [PRIZE.THIRD.rank]: 0,
    [PRIZE.FOURTH.rank]: 0,
    [PRIZE.FIFTH.rank]: 0,
    [PRIZE.NONE.rank]: 0,
  };

  constructor(prizeList) {
    prizeList.forEach((prize) => {
      const temp = this.#stats[`${prize.rank}`] + 1;
      this.#stats[`${prize.rank}`] = temp;
    });
  }

  get stats() {
    return this.#stats;
  }
  totalReturn(investment) {
    let total = 0;
    Object.entries(this.#stats).forEach(([key, value]) => {
      total += PRIZE[key].prize * value;
    });

    return (total / investment) * 100;
  }
}

export default LottoStats;
