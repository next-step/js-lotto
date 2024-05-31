import { LOTTO_PRIZE } from "../constants";

export class LottoRank {
  #lottos;
  #winningLotto;

  constructor(lottos, winningLotto) {
    this.#lottos = lottos;
    this.#winningLotto = winningLotto;
  }

  static getRank(matchedCount, bonusMatched) {
    switch (matchedCount) {
      case LOTTO_PRIZE.FIRST.if:
        return LOTTO_PRIZE.FIRST.rank;
        
      case LOTTO_PRIZE.SECOND.if:
        return bonusMatched ? LOTTO_PRIZE.SECOND.rank : LOTTO_PRIZE.THIRD.rank;

      case LOTTO_PRIZE.FOURTH.if:
        return LOTTO_PRIZE.FOURTH.rank;

      case LOTTO_PRIZE.FIFTH.if:
        return LOTTO_PRIZE.FIFTH.rank;

      default:
        return LOTTO_PRIZE.FAIL.rank;
    }
  }

  getLottoResult() {
    const lottoRankCounts = this.getLottoRankCounts();
    const lottoReturn = this.calculateLottoReturn(lottoRankCounts);

    return { lottoRankCounts, lottoReturn };
  }

  getLottoPrizeValues() {
    return Object.values(LOTTO_PRIZE);
  }

  getLottoRankCounts() {
    const lottoRanks = this.#lottos.map((lotto) => this.#winningLotto.getRank(lotto));
    const lottoRankCounts = this.countLottoRanks(lottoRanks);

    return lottoRankCounts;
  }

  countLottoRanks(lottoRanks) {
    const prizes = this.getLottoPrizeValues().map((prize) => ({ ...prize, count: 0 }));

    return lottoRanks.reduce((acc, rank) => {
      const prize = acc.find((prize) => prize.rank === rank);
      if (prize) prize.count++;
      return acc;
    }, prizes);
  }

  calculateLottoReturn(lottoRankCounts) {
    const total = this.#lottos.length;
    const failed = lottoRankCounts.find(({ rank }) => rank === LOTTO_PRIZE.FAIL.rank).count || 0;
    const lottoReturn = ((total - failed) / total) * 100;

    return lottoReturn;
  }
}
