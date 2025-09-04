import {
  LOTTO_COUNT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
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
    let isValid = false;

    const filterLottoNumbers = this.#winningNumber.filter(
      (num) => num >= LOTTO_MIN_NUMBER && num <= LOTTO_MAX_NUMBER
    );

    isValid = filterLottoNumbers.length === LOTTO_COUNT;

    return isValid;
  }

  // 보너스 번호가 1~45번 사이의 번호인지 체크
  isValidRangeBonusNumber() {
    let isValid = false;

    if (typeof this.#bonusNumber === "number") {
      isValid = LOTTO_MIN_NUMBER && this.#bonusNumber <= LOTTO_MAX_NUMBER;
    }

    return isValid;
  }

  // 당첨번호가 6개인지 확인하는 함수
  isDigitCount() {
    if (this.#winningNumber.length === LOTTO_COUNT) {
      return true;
    }

    return false;
  }

  // 당첨번호에 보너스 번호가 포함되는지 체크
  isBonusNumberNotInWinningNumbers() {
    if (
      this.#winningNumber.filter((num) => num === this.#bonusNumber).length > 0
    ) {
      return false;
    }

    return true;
  }
}

export default WinningNumbers;
