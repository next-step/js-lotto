import {
  LOTTO_COUNT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  MATCH_FIVE_BONUS,
  MATCH_FIVE,
  MATCH_FIVE_PLUS_BONUS,
  MATCHED_PRICE,
  RESULTS_ORDER,
} from "../constants/lotto.js";

class WinningNumbers {
  #winningNumber;
  #bonusNumber;

  constructor(winningNumber, bonusNumber) {
    this.#winningNumber = winningNumber; // 숫자 배열
    this.#bonusNumber = bonusNumber; // 숫자
  }

  // 당첨번호가 1~45번 사이의 번호인지 체크
  isValidRangeWinningNumber() {
    const filterLottoNumbers = this.#winningNumber.filter(
      (num) => num >= LOTTO_MIN_NUMBER && num <= LOTTO_MAX_NUMBER
    );

    return filterLottoNumbers.length === LOTTO_COUNT;
  }

  // 보너스 번호가 1~45번 사이의 번호인지 체크
  isValidRangeBonusNumber() {
    return (
      typeof this.#bonusNumber === "number" &&
      this.#bonusNumber >= LOTTO_MIN_NUMBER &&
      this.#bonusNumber <= LOTTO_MAX_NUMBER
    );
  }

  // 당첨번호가 6개인지 확인하는 함수
  isDigitCount() {
    return this.#winningNumber.length === LOTTO_COUNT;
  }

  // 당첨번호에 보너스 번호가 포함되는지 체크
  isBonusNumberNotInWinningNumbers() {
    return this.#winningNumber.includes(this.#bonusNumber);
  }

  matchLottoPriceKey(sameNumberCount, sameBonusNumberCount) {
    if (sameNumberCount < MATCH_THREE) return;

    if (sameNumberCount === MATCH_FIVE && sameBonusNumberCount)
      return MATCH_FIVE_BONUS;

    return sameNumberCount;
  }

  updatePriceCheck(lotto, priceCheck) {
    const sameBonusNumberCount = lotto.includes(this.#bonusNumber);
    const sameNumberCount = lotto.filter((num) =>
      this.#winningNumber.includes(num)
    ).length;

    const key = this.matchLottoPriceKey(sameNumberCount, sameBonusNumberCount);

    if (!key) return;

    priceCheck[key] = (priceCheck[key] || 0) + 1;
  }

  checkWinningStatistics(lottoTickets) {
    console.log("당첨 통계");
    console.log("--------------------");

    const priceCheck = {};

    lottoTickets.forEach((lotto) => this.updatePriceCheck(lotto, priceCheck));

    this.resultsOrder(priceCheck);
    this.rateOfReturn(priceCheck);
  }

  printStatistics(priceCheck) {
    RESULTS_ORDER.forEach(({ key, label, price }) => {
      const count = priceCheck[key] || 0;
      console.log(`${label} (${price.toLocaleString()}원) - ${count}개`);
    });
  }

  rateOfReturn(priceCheck) {
    //
  }
}

export default WinningNumbers;
