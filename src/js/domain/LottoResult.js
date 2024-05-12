import { ErrorLottoBonusNumber } from "../constants/error";
import Lotto from "./Lotto";

class LottoResult {
  static LottoRanking = [-1, 1, 2, 3, 4, 5];
  static LottoMatchingCountCondition = [0, 6, 5, 5, 4, 3];
  static LottoWinningPrice = [
    0, 2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000,
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
    if (lottoRanking == LottoResult.LottoRanking[0]) {
      return LottoResult.LottoWinningPrice[0];
    }
    return LottoResult.LottoWinningPrice[lottoRanking];
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
      case LottoResult.LottoMatchingCountCondition[1]:
        return LottoResult.LottoRanking[1];
      case LottoResult.LottoMatchingCountCondition[2]:
        return isBonusNumberMatching
          ? LottoResult.LottoRanking[2]
          : LottoResult.LottoRanking[3];
      case LottoResult.LottoMatchingCountCondition[4]:
        return LottoResult.LottoRanking[4];
      case LottoResult.LottoMatchingCountCondition[5]:
        return LottoResult.LottoRanking[5];
      default:
        return LottoResult.LottoRanking[0];
    }
  }

  getLottoRankings(lottos) {
    const lottoRankings = lottos.map((lotto) => this.getLottoRanking(lotto));

    return lottoRankings;
  }

  getLottoRankingStatistics(lottos) {
    const lottoRankings = this.getLottoRankings(lottos);
    const lottoRankingCounts = Array(LottoResult.LottoRanking.length).fill(0);

    // 1 ~ 5등에 해당하지 않는 유효하지 않은 등수 제거
    const filteredRankings = lottoRankings.filter(
      (lottoRanking) => lottoRanking > 0
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
