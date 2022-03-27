import { WARNING_WHEN_NOT_IN_1000_UNITS, UNIT_PRICE } from "./utils/consts.js";

class Lotto {
  #price
  constructor(price) {
    this.#price = price
  }

  isPriceValid() {
    if (this.#price < UNIT_PRICE || this.#price >= (UNIT_PRICE * 1000)) return false

    if ((this.#price % UNIT_PRICE) !== 0) return this.valueInitAndAlertNotUnitOfthousand()

    return true
  }
  
  valueInitAndAlertNotUnitOfthousand() {
    alert(WARNING_WHEN_NOT_IN_1000_UNITS)
    return false;
  }

  get lottoTicketAmount() {
    return this.isPriceValid() ? (this.#price / UNIT_PRICE) : null
  }

  static createRandomNumberFromOneToFortyFive(count) {
    const lottoRandomNumbers = []
    // 1 ~ 45 숫자로 구성된 배열 만들기
    // 랜덤으로 셔플 하는 함수 가져오기
    // 6개로 잘라서 가져옴
    for (let i = 0; i < count; i++) {
      while (true) {
        const randomNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1)
        const set = new Set (randomNumbers)
        if (randomNumbers.length === set.size) {
          lottoRandomNumbers.push(String(randomNumbers).replaceAll(',', ', '))
          break
        }
      }
    }

    return lottoRandomNumbers
  }

  static validateWinningNumberRange(winningNumberLengths) {
    return winningNumberLengths.every(length => length >= 1 && length < 46)
  }
  
  static validateDuplicateWinningNumber(winningNumbers) {
    return winningNumbers.every((num, index) => index === winningNumbers.lastIndexOf(num))
  } 
  
}

export default Lotto;
