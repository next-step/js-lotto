import { LottoRank } from "./enum/LottoRank";

export class LottoStats {
  #totalCount;
  #totalReward;
  #rankCount = new Map();

  constructor(lottoRanks) {
    this.#checkLottoRanks(lottoRanks);

    this.#totalCount = lottoRanks.length;
    this.#totalReward = lottoRanks.reduce((a, { reward }) => a + reward, 0);
    this.#increaseRankCount(lottoRanks);
  }

  #checkLottoRanks(lottoRanks) {
    if (lottoRanks.some((e) => !Object.values(LottoRank).includes(e))) {
      throw new Error();
    }
  }

  #increaseRankCount(lottoRanks) {
    lottoRanks.forEach(({ rank }) => {
      const count = this.#rankCount.has(rank) ? this.#rankCount.get(rank) : 0;
      this.#rankCount.set(rank, count + 1);
    });
  }

  get totalCount() {
    return this.#totalCount;
  }

  get totalReward() {
    return this.#totalReward;
  }

  get rankCount() {
    return this.#rankCount;
  }
}
