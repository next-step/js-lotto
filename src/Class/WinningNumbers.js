import {
  LOTTO_COUNT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  RESULTS_ORDER,
  MatchBallCount,
} from "../constants/lotto.js";

class WinningNumbers {
  #winningNumber;
  #bonusNumber;

  constructor(winningNumber, bonusNumber) {
    if (
      !this.isValidRangeWinningNumber(winningNumber) ||
      !this.isValidRangeBonusNumber(bonusNumber) ||
      !this.isDigitCount(winningNumber) ||
      !this.isBonusNumberNotInWinningNumbers(winningNumber, bonusNumber)
    ) {
      console.log("안만들어짐_____________");
      return false;
    }

    this.#winningNumber = winningNumber; // 숫자 배열
    this.#bonusNumber = bonusNumber; // 숫자
  }

  // 당첨번호가 1~45번 사이의 번호인지 체크
  isValidRangeWinningNumber(winningNumber) {
    const filterLottoNumbers = winningNumber.filter(
      (num) => num >= LOTTO_MIN_NUMBER && num <= LOTTO_MAX_NUMBER
    );

    return filterLottoNumbers.length === LOTTO_COUNT;
  }

  // 보너스 번호가 1~45번 사이의 번호인지 체크
  isValidRangeBonusNumber(bonusNumber) {
    return (
      typeof bonusNumber === "number" &&
      bonusNumber >= LOTTO_MIN_NUMBER &&
      bonusNumber <= LOTTO_MAX_NUMBER
    );
  }

  // 당첨번호가 6개인지 확인하는 함수
  isDigitCount(winningNumber) {
    return winningNumber.length === LOTTO_COUNT;
  }

  // 당첨번호에 보너스 번호가 포함되는지 체크
  isBonusNumberNotInWinningNumbers(winningNumber, bonusNumber) {
    return !winningNumber.includes(bonusNumber);
  }

  // 일치하는 로또 숫자 갯수에 맞춰 키 return
  matchLottoPriceKey(sameNumberCount, sameBonusNumberCount) {
    if (sameNumberCount < MatchBallCount.MATCH_THREE) return;

    if (sameNumberCount === MatchBallCount.MATCH_FIVE && sameBonusNumberCount)
      return MatchBallCount.MATCH_FIVE_BONUS;

    return sameNumberCount;
  }

  // 당첨된 로또 갯수 체크
  updatePriceCheck(lotto, priceCheck) {
    const sameBonusNumberCount = lotto.includes(this.#bonusNumber);
    const sameNumberCount = lotto.filter((num) =>
      this.#winningNumber.includes(num)
    ).length;

    const key = this.matchLottoPriceKey(sameNumberCount, sameBonusNumberCount);

    if (!key) return;

    priceCheck[key] = (priceCheck[key] || 0) + 1;
  }

  // 당첨 통계 내기
  checkWinningStatistics(lottoTickets) {
    console.log("당첨 통계");
    console.log("--------------------");

    const priceCheck = {};

    lottoTickets.forEach((lotto) => this.updatePriceCheck(lotto, priceCheck));

    this.printStatistics(priceCheck);

    return priceCheck;
  }

  // 통계 보여주는 console
  printStatistics(priceCheck) {
    RESULTS_ORDER.forEach(({ key, label, price }) => {
      const count = priceCheck[key] || 0;
      console.log(`${label} (${price.toLocaleString()}원) - ${count}개`);
    });
  }

  // 수익률
  rateOfReturn(priceCheck, purchaseAmount) {
    const convertPrice = RESULTS_ORDER.map((el) =>
      priceCheck[el.key] ? el.price * priceCheck[el.key] : 0
    );

    const amountPrice = convertPrice.reduce((a, b) => a + b, 0);

    const rateOfReturn = (amountPrice / purchaseAmount) * 100;

    console.log(`총 수익률은 ${rateOfReturn}%입니다.`);
    return rateOfReturn;
  }
}

export default WinningNumbers;
