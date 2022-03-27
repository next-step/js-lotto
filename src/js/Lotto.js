import { WARNING_WHEN_NOT_IN_1000_UNITS,
  UNIT_PRICE,
  FIRST_PRIZE,
  SECOND_PRIZE,
  THIRD_PRIZE,
  FOURTH_PRIZE,
  FIFTH_PRIZE
} from "./utils/consts.js";

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
  
  winningResult(winningNumberList, randomNumberLists) {
    const bonusNumberIndex = winningNumberList.length - 1
    const bonusNumber = Number(winningNumberList[bonusNumberIndex].value)
    winningNumberList = winningNumberList.map(input => Number(input.value))
    randomNumberLists = randomNumberLists.map(list => list.split(', ').map(num => Number(num)))
    
    const rankByTicket = randomNumberLists.map(numberList => numberList.filter(num => winningNumberList.includes(num)))
      .map(guessNumbers => this.evaluateRank(guessNumbers, bonusNumber))
    
    const rankCount = [...this.rankCounter(rankByTicket).values()];
    const rankOfPrize = [FIRST_PRIZE, SECOND_PRIZE, THIRD_PRIZE, FOURTH_PRIZE, FIFTH_PRIZE];
    const totalWinnings = [...rankCount]
      .map((count, i) => count * rankOfPrize[i])
      .reduce((pre, cur) => pre + cur)
    const profitRate = (totalWinnings / this.#price) * 100
    return {
      profitRate, 
      rankCount
    }
  }

  evaluateRank(guessNumbers, bonusNumber) {
    const onlyMatchNumbers = guessNumbers.filter(num => num !== bonusNumber)
    switch (onlyMatchNumbers.length) {
      case 6:
        return 1
      case 5:
        return guessNumbers.includes(bonusNumber) ? 2 : 3
      case 4:
        return 4
      case 3:
        return 5
      default:
        return 6
    }
  }
  
  rankCounter(rankByTicket) {
    const rankNumbers = [1,2,3,4,5]
    const map = new Map()
    rankNumbers.forEach((e, i) => {
      let count = 0
      rankByTicket.forEach(rank => {
        rank === e && count ++
      })
      map.set(i + 1, count)
    })
    return map
  }
}

export default Lotto;
