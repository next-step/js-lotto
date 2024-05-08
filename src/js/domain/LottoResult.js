import { LottoWinningPrice } from "../../constants/lottoResult";

class LottoResult {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = [...winningNumbers];
    this.#bonusNumber = bonusNumber;
  }

  static getLottoWinningPrice(lottoRanking) {
    switch (lottoRanking) {
      case 1:
        return LottoWinningPrice.FIRST;
      case 2:
        return LottoWinningPrice.SECOND;
      case 3:
        return LottoWinningPrice.THIRD;
      case 4:
        return LottoWinningPrice.FOURTH;
      case 5:
        return LottoWinningPrice.FIFTH;
      default:
        return 0;
    }
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
      case 6:
        return 1;
      case 5:
        return isBonusNumberMatching ? 2 : 3;
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return -1;
    }
  }
}

export default LottoResult;
