import {
  LOTTO_COUNT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
} from "../constants/lotto";

class WinningNumbers {
  #winningNumber;
  #bonusWinningNumber;

  construnctor() {
    this.#winningNumber = [];
    this.#bonusWinningNumber = 0;
  }

  // 당첨번호 및 보너스 번화가 1~45번 사이의 번호인지 체크
  isValidRangeNumber(winningNumber) {
    let isValid = false;

    if (typeof winningNumber === "number") {
      isValid = LOTTO_MIN_NUMBER && winningNumber <= LOTTO_MAX_NUMBER;
    } else {
      const filterLottoNumbers = winningNumber.filter(
        (num) => num >= LOTTO_MIN_NUMBER && num <= LOTTO_MAX_NUMBER
      );

      isValid = filterLottoNumbers.length === LOTTO_COUNT;
    }

    return isValid;
  }
}

export default WinningNumbers;
