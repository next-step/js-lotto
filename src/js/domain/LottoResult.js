import {
  ErrorLottoBonusNumber,
  ErrorLottoWinningNumbers,
} from "../../constants/error";
import {
  LottoMatchingCountCondition,
  LottoWinningPrice,
  MAX_LOTTO_RANKING,
} from "../../constants/lottoResult";

class LottoResult {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = [...winningNumbers];
    this.#bonusNumber = bonusNumber;
  }

  static getLottoWinningPrice(lottoRanking) {
    if (lottoRanking == -1) {
      return 0;
    }
    return LottoWinningPrice[lottoRanking];
  }

  static getTotalLottoWinningPrice(lottoRankings) {
    const totalLottoWinningPrice = lottoRankings.reduce((acc, lottoRanking) => {
      return LottoResult.getLottoWinningPrice(lottoRanking) + acc;
    }, 0);

    return totalLottoWinningPrice;
  }

  static getTotalLottoProfitRate(totalLottoWinningPrice, lottoPurcasedAmount) {
    return (totalLottoWinningPrice / lottoPurcasedAmount) * 100;
  }

  static validateWinningNumbers(input) {
    const winningNumbers = input.split(",");
    const winningNumbersSet = new Set(winningNumbers);

    if (winningNumbers.length !== winningNumbersSet.size) {
      throw new Error(
        ErrorLottoWinningNumbers.ERROR_LOTTO_WINNING_NUMBERS_DUPLICATED
      );
    }
  }

  static validateBonusNumber(input, winningNumbers) {
    if (isNaN(input)) {
      throw new Error(
        ErrorLottoBonusNumber.ERROR_LOTTO_BONUS_NUMBER_NOT_NUMBER
      );
    }

    if (winningNumbers.includes(Number(input))) {
      throw new Error(
        ErrorLottoBonusNumber.ERROR_LOTTO_BONUS_NUMBER_DUPLICATED
      );
    }
  }

  static getLottoRankingCounts(lottoRankings) {
    const lottoRankingCounts = Array(MAX_LOTTO_RANKING + 1).fill(0);

    // 1 ~ 5등에 해당하지 않는 유효하지 않은 등수 제거
    const filteredRankings = lottoRankings.filter(
      (lottoRanking) => lottoRanking > 0
    );

    filteredRankings.forEach((ranking) => {
      lottoRankingCounts[ranking] += 1;
    });

    return lottoRankingCounts;
  }

  countMatchingWinningNumbers(lottoNumbers) {
    const matchedWinningNumbers = this.#winningNumbers.filter((winningNumber) =>
      lottoNumbers.includes(winningNumber)
    );
    return matchedWinningNumbers.length;
  }

  isBonusNumberMatching(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }

  getLottoRanking(lottoNumbers) {
    const matchingCount = this.countMatchingWinningNumbers(lottoNumbers);
    const isBonusNumberMatching = this.isBonusNumberMatching(lottoNumbers);

    switch (matchingCount) {
      case LottoMatchingCountCondition[1]:
        return 1;
      case LottoMatchingCountCondition[2]:
        return isBonusNumberMatching ? 2 : 3;
      case LottoMatchingCountCondition[4]:
        return 4;
      case LottoMatchingCountCondition[5]:
        return 5;
      default:
        return -1;
    }
  }
}

export default LottoResult;
