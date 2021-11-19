import { ErrorMsgs, UNIT_PRICE, GRADES, Entry, WinningList, MAX_NUM, MIN_NUM, NUMBERS_PER_LOTTO } from './constants.js'

const arrayGen = (size: number, mapper: (v: any, k: number) => any) => [...Array(size)].map(mapper)
const ALL_NUMBERS = arrayGen(MAX_NUM, (_, i) => i + 1) as number[]

const generateRandomLotto = () => {
  const cloneNumbers = [...ALL_NUMBERS]
  return arrayGen(
    NUMBERS_PER_LOTTO,
    () => cloneNumbers.splice(Math.floor(Math.random() * cloneNumbers.length), 1)[0],
  ) as Entry
}

class LottoModel {
  #data: {
    amount: number
    list: Entry[]
  } = {
    amount: 0,
    list: [],
  }

  isValid(item: number[], validLength: number) {
    if (item.length !== validLength || [...new Set(item)].length !== item.length) throw Error(ErrorMsgs.DUPLICATED)
    if (item.some(n => n < MIN_NUM || n > MAX_NUM)) throw Error(ErrorMsgs.OUT_OF_RANGE)
    return true
  }
  setPrice(price: number) {
    if (price < UNIT_PRICE) throw Error(ErrorMsgs.MIN_PRICE)
    const amount = Math.floor(price / UNIT_PRICE)
    this.#data.amount = amount
    this.#data.list = []
    return amount
  }
  setEntry(index: number, item: Entry, isRandom: boolean = false) {
    const entry = isRandom ? generateRandomLotto() : item
    if (!this.isValid(entry, NUMBERS_PER_LOTTO)) return
    this.#data.list[index] = entry
    return entry
  }
  setAllLottoRandom(price: number) {
    const amount = this.setPrice(price)
    const list = arrayGen(amount, generateRandomLotto)
    this.#data.list = list
    return list
  }
  getWinList(numbers: number[]) {
    const amount = this.#data.list.length
    const winningNumbers = [...numbers]
    if (!this.isValid(winningNumbers, NUMBERS_PER_LOTTO + 1)) return false
    const bonusNumber = winningNumbers.pop() as number

    const res: WinningList = this.#data.list.reduce(
      (p, c) => {
        const matched = winningNumbers.filter(num => c.includes(+num)) || []
        const bonusMatched = matched.length === NUMBERS_PER_LOTTO - 1 && c.includes(+bonusNumber)
        switch (matched.length) {
          case 3:
            p.g5 += 1
            break
          case 4:
            p.g4 += 1
            break
          case 5: {
            if (!bonusMatched) p.g3 += 1
            else p.g2 += 1
            break
          }
          case 6:
            p.g1 += 1
        }
        return p
      },
      {
        g5: 0,
        g4: 0,
        g3: 0,
        g2: 0,
        g1: 0,
      },
    )

    return {
      winningList: res,
      earningRate:
        (100 *
          (Object.entries(GRADES).reduce((p, [g, { winPrice }]) => p + winPrice * res[g], 0) - amount * UNIT_PRICE)) /
        (amount * UNIT_PRICE),
    }
  }
}

export default new LottoModel()
