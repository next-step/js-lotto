class LottoRanking {
  static Ranking = {
    FIRST: "FIRST",
    SECOND: "SECOND",
    THIRD: "THIRD",
    FOURTH: "FOURTH",
    FIFTH: "FIFTH",
  };

  static LottoRankingInfo = {
    [LottoRanking.Ranking.FIRST]: {
      ranking: LottoRanking.Ranking.FIRST,
      winningPrice: 2_000_000_000,
      condition: 6,
    },
    [LottoRanking.Ranking.SECOND]: {
      ranking: LottoRanking.Ranking.SECOND,
      winningPrice: 30_000_000,
      condition: 5,
    },
    [LottoRanking.Ranking.THIRD]: {
      ranking: LottoRanking.Ranking.THIRD,
      winningPrice: 1_500_000,
      condition: 5,
    },
    [LottoRanking.Ranking.FOURTH]: {
      ranking: LottoRanking.Ranking.FOURTH,
      winningPrice: 50_000,
      condition: 4,
    },
    [LottoRanking.Ranking.FIFTH]: {
      ranking: LottoRanking.Ranking.FIFTH,
      winningPrice: 5_000,
      condition: 3,
    },
  };

  #winningLotto;

  constructor(winningLotto) {
    this.#winningLotto = winningLotto;
  }

  get winningNumbers() {
    return this.#winningLotto.lottoNumbers;
  }

  static getTotalLottoProfitRate(totalLottoWinningPrice, lottoPurcasedAmount) {
    return (totalLottoWinningPrice / lottoPurcasedAmount) * 100;
  }

  getLottoRanking(lotto) {
    const { count, bonusNumberMatched } = this.#winningLotto.matchInfo(lotto);

    switch (count) {
      case LottoRanking.LottoRankingInfo[LottoRanking.Ranking.FIRST].condition:
        return LottoRanking.LottoRankingInfo[LottoRanking.Ranking.FIRST];
      case LottoRanking.LottoRankingInfo[LottoRanking.Ranking.SECOND].condition:
        return bonusNumberMatched
          ? LottoRanking.LottoRankingInfo[LottoRanking.Ranking.SECOND]
          : LottoRanking.LottoRankingInfo[LottoRanking.Ranking.THIRD];
      case LottoRanking.LottoRankingInfo.FOURTH.condition:
        return LottoRanking.LottoRankingInfo[LottoRanking.Ranking.FOURTH];
      case LottoRanking.LottoRankingInfo.FIFTH.condition:
        return LottoRanking.LottoRankingInfo[LottoRanking.Ranking.FIFTH];
      default:
        return null;
    }
  }

  getLottoRankings(lottos) {
    const lottoRankings = lottos
      .map((lotto) => this.getLottoRanking(lotto))
      .filter((ranking) => ranking !== null);

    return lottoRankings;
  }

  getLottoRankingCount(lottos, ranking) {
    const lottoRankings = this.getLottoRankings(lottos);

    return lottoRankings.filter(
      (lottoRanking) => lottoRanking.ranking === LottoRanking.Ranking[ranking]
    ).length;
  }

  getTotalLottoWinningPrice(lottos) {
    const lottoRankings = this.getLottoRankings(lottos);
    const totalLottoWinningPrice = lottoRankings.reduce((acc, lottoRanking) => {
      return acc + lottoRanking.winningPrice;
    }, 0);

    return totalLottoWinningPrice;
  }
}

export default LottoRanking;
