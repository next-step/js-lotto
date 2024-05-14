import { ErrorLottoBonusNumber } from "../constants/error";
import Lotto from "./Lotto";

class LottoResult {
  static LottoRanking = [
    null,
    {
      ranking: 1,
      winningPrice: 2_000_000_000,
      condition: 6,
    },
    {
      ranking: 2,
      winningPrice: 30_000_000,
      condition: 5,
    },
    {
      ranking: 3,
      winningPrice: 1_500_000,
      condition: 5,
    },
    {
      ranking: 4,
      winningPrice: 50_000,
      condition: 4,
    },
    {
      ranking: 5,
      winningPrice: 5_000,
      condition: 3,
    },
  ];

  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    Lotto.validateLottoNumbers(winningNumbers);

    const winningNumbersArray =
      Lotto.convertLottoNumbersToArray(winningNumbers);
    this.#winningNumbers = winningNumbersArray;

    LottoResult.validateBonusNumber(bonusNumber, this.#winningNumbers);
    this.#bonusNumber = Number(bonusNumber);
  }

  static getLottoWinningPrice(lottoRanking) {
    return LottoResult.LottoRanking[lottoRanking].winningPrice;
  }

  static getTotalLottoProfitRate(totalLottoWinningPrice, lottoPurcasedAmount) {
    return (totalLottoWinningPrice / lottoPurcasedAmount) * 100;
  }

  static validateBonusNumber(input, winningNumbers) {
    Lotto.validateLottoNumber(input);

    if (winningNumbers.includes(Number(input))) {
      throw new Error(
        ErrorLottoBonusNumber.ERROR_LOTTO_BONUS_NUMBER_DUPLICATED
      );
    }
  }

  getLottoRanking(lotto) {
    const matchingCount = lotto.countMatchingLottoNumbers(this.#winningNumbers);
    const isBonusNumberMatching = lotto.hasLottoNumber(this.#bonusNumber);

    switch (matchingCount) {
      case LottoResult.LottoRanking[1].condition:
        return LottoResult.LottoRanking[1].ranking;
      case LottoResult.LottoRanking[2].condition:
        return isBonusNumberMatching
          ? LottoResult.LottoRanking[2].ranking
          : LottoResult.LottoRanking[3].ranking;
      case LottoResult.LottoRanking[4].condition:
        return LottoResult.LottoRanking[4].ranking;
      case LottoResult.LottoRanking[5].condition:
        return LottoResult.LottoRanking[5].ranking;
      default:
        return LottoResult.LottoRanking[0];
    }
  }

  getLottoRankings(lottos) {
    const lottoRankings = lottos
      .map((lotto) => this.getLottoRanking(lotto))
      .filter((ranking) => ranking !== null);

    return lottoRankings;
  }

  getLottoRankingsCounts(lottos) {
    const lottoRankings = this.getLottoRankings(lottos);
    const lottoRankingCounts = Array(LottoResult.LottoRanking.length).fill(0);

    // 1 ~ 5등에 해당하지 않는 유효하지 않은 등수 제거
    const filteredRankings = lottoRankings.filter(
      (lottoRanking) => lottoRanking !== null
    );

    filteredRankings.forEach((ranking) => {
      lottoRankingCounts[ranking] += 1;
    });

    return lottoRankingCounts;
  }

  getTotalLottoWinningPrice(lottos) {
    const lottoRankings = this.getLottoRankings(lottos);
    const totalLottoWinningPrice = lottoRankings.reduce((acc, lottoRanking) => {
      return LottoResult.getLottoWinningPrice(lottoRanking) + acc;
    }, 0);

    return totalLottoWinningPrice;
  }
}

export default LottoResult;
