class LottoRanking {
  static Ranking = {
    FIRST: "FIRST",
    SECOND: "SECOND",
    THIRD: "THIRD",
    FOURTH: "FOURTH",
    FIFTH: "FIFTH",
  };

  static LottoPrize = {
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

  getLottoPrize(lotto) {
    const { count, bonusNumberMatched } = this.#winningLotto.matchInfo(lotto);

    const lottoPrizes = Object.values(LottoRanking.LottoPrize).filter(
      (prize) => prize.condition === count
    );

    if (lottoPrizes.length > 1) {
      return bonusNumberMatched ? lottoPrizes[0] : lottoPrizes[1];
    }

    return lottoPrizes[0] || null;
  }

  getLottoPrizes(lottos) {
    const lottoPrizes = lottos
      .map((lotto) => this.getLottoPrize(lotto))
      .filter((ranking) => ranking !== null);

    return lottoPrizes;
  }

  getLottoPrizeCount(lottos, ranking) {
    const lottoPrizes = this.getLottoPrizes(lottos);

    return lottoPrizes.filter(
      (lottoPrize) => lottoPrize.ranking === LottoRanking.Ranking[ranking]
    ).length;
  }

  getTotalLottoWinningPrice(lottos) {
    const lottoPrizes = this.getLottoPrizes(lottos);
    const totalLottoWinningPrice = lottoPrizes.reduce((acc, lottoPrize) => {
      return acc + lottoPrize.winningPrice;
    }, 0);

    return totalLottoWinningPrice;
  }
}

export default LottoRanking;
