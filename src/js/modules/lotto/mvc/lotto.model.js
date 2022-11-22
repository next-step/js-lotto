export class LottoModel {
  constructor({ price, winningNumberCnt, numberMin, numberMax }) {
    this.numberList = []
    this.numberMin = numberMin
    this.numberMax = numberMax
    this.price = price
    this.winningNumberCnt = winningNumberCnt
    this.lottoList = []
  }

  init() {
    const numberListCnt = this.#getRandomNumberCnt()
    this.numberList = new Array(numberListCnt).fill(this.numberMin).map((number, idx) => number + idx)

    return this
  }

  issue(purchaseAmount) {
    const lottoCnt = purchaseAmount / this.price

    const lottoList = new Array(lottoCnt).fill(null).map((el, idx) => {
      const numberList = this.numberList
      const winningNumberCnt = this.winningNumberCnt
      const maxIdx = numberList.length - 1 - winningNumberCnt * idx

      return this.#makeLotto({ numberList, winningNumberCnt, maxIdx })
    })

    this.lottoList = lottoList
    return this
  }

  getLottoList() {
    return this.lottoList
  }

  #getRandomNumberCnt() {
    return this.numberMax - this.numberMin + 1
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
