export class LottoMachine {
  constructor({ price, winningNumberCnt, numberMin, numberMax }) {
    this.price = price
    this.winningNumberCnt = winningNumberCnt
    this.numberMin = numberMin
    this.numberMax = numberMax
    this.numberList = []
    this.remainNumberCnt = 0
  }

  init() {
    // 중복 제거를 할 수 있게, 뽑을 수 있는 숫자 리스트를 미리 만들어둔다.
    const numberListCnt = this.numberMax - this.numberMin + 1

    this.numberList = new Array(numberListCnt).fill(this.numberMin).map((number, idx) => number + idx)
    this.remainNumberCnt = numberListCnt

    return this
  }

  issue(purchaseAmount) {
    // 금액에 해당하는 로또의 갯수
    const lottoCnt = purchaseAmount / this.price

    // 전체 로또 리스트 만들기
    const issueList = new Array(lottoCnt).fill(0).map(() => this.#makeLotto())

    return issueList
  }

  #makeLotto() {
    // 로또 한 세트를 만드는 메서드
    const getRandomIdx = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

    const lotto = new Array(this.winningNumberCnt).fill(0).map(() => {
      const randomIdx = getRandomIdx(0, this.remainNumberCnt - 1)
      const newNumber = this.numberList[randomIdx]
      this.numberList[randomIdx] = this.numberList[this.remainNumberCnt - 1]
      this.remainNumberCnt -= 1
      return newNumber
    })

    return lotto
  }
}
