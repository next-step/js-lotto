import LottoNumber from "./LottoNumber";

class LottoResult {
  static LottoRanking = {
    FIRST: "FIRST",
    SECOND: "SECOND",
    THIRD: "THIRD",
    FOURTH: "FOURTH",
    FIFTH: "FIFTH",
  };

  static LottoRankingInfo = {
    [LottoResult.LottoRanking.FIRST]: {
      ranking: LottoResult.LottoRanking.FIRST,
      winningPrice: 2_000_000_000,
      condition: 6,
    },
    [LottoResult.LottoRanking.SECOND]: {
      ranking: LottoResult.LottoRanking.SECOND,
      winningPrice: 30_000_000,
      condition: 5,
    },
    [LottoResult.LottoRanking.THIRD]: {
      ranking: LottoResult.LottoRanking.THIRD,
      winningPrice: 1_500_000,
      condition: 5,
    },
    [LottoResult.LottoRanking.FOURTH]: {
      ranking: LottoResult.LottoRanking.FOURTH,
      winningPrice: 50_000,
      condition: 4,
    },
    [LottoResult.LottoRanking.FIFTH]: {
      ranking: LottoResult.LottoRanking.FIFTH,
      winningPrice: 5_000,
      condition: 3,
    },
  };

  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto;
    LottoNumber.validateBonusNumber(bonusNumber, this.#winningLotto);
    this.#bonusNumber = bonusNumber;
  }

  get winningNumbers() {
    return this.#winningLotto.numbers;
  }

  static getTotalLottoProfitRate(totalLottoWinningPrice, lottoPurcasedAmount) {
    return (totalLottoWinningPrice / lottoPurcasedAmount) * 100;
  }

  getLottoRanking(lotto) {
    const matchingCount = lotto.countMatchingLottoNumbers(this.#winningLotto);
    const isBonusNumberMatching = lotto.hasLottoNumber(this.#bonusNumber);

    switch (matchingCount) {
      case LottoResult.LottoRankingInfo[LottoResult.LottoRanking.FIRST]
        .condition:
        return LottoResult.LottoRankingInfo[LottoResult.LottoRanking.FIRST];
      case LottoResult.LottoRankingInfo[LottoResult.LottoRanking.SECOND]
        .condition:
        return isBonusNumberMatching
          ? LottoResult.LottoRankingInfo[LottoResult.LottoRanking.SECOND]
          : LottoResult.LottoRankingInfo[LottoResult.LottoRanking.THIRD];
      case LottoResult.LottoRankingInfo.FOURTH.condition:
        return LottoResult.LottoRankingInfo[LottoResult.LottoRanking.FOURTH];
      case LottoResult.LottoRankingInfo.FIFTH.condition:
        return LottoResult.LottoRankingInfo[LottoResult.LottoRanking.FIFTH];
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
      (lottoRanking) =>
        lottoRanking.ranking === LottoResult.LottoRanking[ranking]
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

export default LottoResult;
