import { Subject } from '../../util/subscirbe.js'
import { INITIAL_STATE } from './lotto.constant.js'

export class Lotto extends Subject {
  constructor() {
    super()
    this.data = INITIAL_STATE
  }

  init({ price, winningNumberCnt, numberMin, numberMax }) {
    this.data.numberMin = numberMin
    this.data.numberMax = numberMax
    this.data.price = price
    this.data.winningNumberCnt = winningNumberCnt

    const numberListCnt = this.#getRandomNumberCnt()
    this.data.numberList = new Array(numberListCnt).fill(this.data.numberMin).map((number, idx) => number + idx)
    return this
  }

  getLottoList() {
    return this.data.lottoList
  }

  issue(purchaseAmount) {
    const lottoCnt = purchaseAmount / this.data.price

    const lottoList = new Array(lottoCnt).fill(null).map((el, idx) => {
      const numberList = this.data.numberList
      const winningNumberCnt = this.data.winningNumberCnt
      const maxIdx = numberList.length - 1 - winningNumberCnt * idx

      return this.#makeLotto({ numberList, winningNumberCnt, maxIdx })
    })

    this.data.lottoList = lottoList
    this.notifyObservers(lottoList.length)
    return this
  }

  getWinningNumberCnt(enteredNumberList, winningLottoList, bonusNumber) {
    const defaultWinningCounts = {
      three: 0,
      four: 0,
      five: 0,
      fiveBonus: 0,
      six: 0,
    }

    return winningLottoList
      .map((lotto) => this.#getMatchingCnt(enteredNumberList, lotto, bonusNumber))
      .reduce((winningCounts, { matchCount, isMatchedBonus }) => {
        switch (matchCount) {
          case 3:
            return { ...winningCounts, three: winningCounts.three + 1 }
          case 4:
            return { ...winningCounts, four: winningCounts.four + 1 }
          case 5:
            return isMatchedBonus
              ? { ...winningCounts, fiveBonus: winningCounts.fiveBonus + 1 }
              : { ...winningCounts, five: winningCounts.five + 1 }
          case 6:
            return { ...winningCounts, six: winningCounts.six + 1 }
          default:
            return { ...winningCounts }
        }
      }, defaultWinningCounts)
  }

  #getMatchingCnt(enteredNumberList, winningLotto, bonusNumber) {
    const matchingArray = enteredNumberList.filter((num1) => winningLotto.some((num2) => num1 === num2))
    const isMatchedBonus = winningLotto.some((number) => number === bonusNumber)

    return { matchCount: matchingArray.length, isMatchedBonus }
  }

  #getRandomNumberCnt() {
    return this.data.numberMax - this.data.numberMin + 1
  }

  #makeLotto({ winningNumberCnt, maxIdx, numberList }) {
    const getRandomIdx = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

    const minIdx = 0

    const lotto = new Array(winningNumberCnt).fill(0).map(() => {
      const randomIdx = getRandomIdx(minIdx, maxIdx)
      const newNumber = numberList[randomIdx]
      numberList[randomIdx] = numberList[maxIdx]
      maxIdx -= 1

      return newNumber
    })

    return lotto
  }
}
