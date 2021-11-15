import { ErrorMsgs, UNIT_PRICE, GRADES, LottoSet, WinningList } from './constants.js'

const arrayGen = (size: number, mapper: (v: any, k: number) => any) => [...Array(size)].map(mapper)
const numbers = arrayGen(45, (_, i) => i + 1) as number[]

const buildRandomLotto = () => {
  const cloneNumbers = [...numbers]
  return arrayGen(6, () => cloneNumbers.splice(Math.floor(Math.random() * cloneNumbers.length), 1)[0]) as LottoSet
}

class LottoModel {
  #data: {
    amount: number
    list: LottoSet[]
  } = {
    amount: 0,
    list: [],
  }

  #isLottoValid(item: number[], validLength: number) {
    if (item.length !== validLength || [...new Set(item)].length !== item.length) throw Error(ErrorMsgs.DUPLICATED)
    if (item.some(n => n < 1 || n > 45)) throw Error(ErrorMsgs.OUT_OF_RANGE)
    return true
  }
  setPrice(price: number) {
    if (price < UNIT_PRICE) throw Error(ErrorMsgs.MIN_PRICE)
    const amount = Math.floor(price / UNIT_PRICE)
    this.#data.amount = amount
    return amount
  }
  setLottoItem(index: number, item: LottoSet) {
    if (!this.#isLottoValid(item, 6)) return
    this.#data.list[index] = item
    return item
  }
  setLottoItemRandom(index: number) {
    const item = buildRandomLotto()
    if (!this.#isLottoValid(item, 6)) return
    this.#data.list[index] = item
    return item
  }
  setAllLottoRandom(price: number) {
    const amount = this.setPrice(price)
    const list = arrayGen(amount, buildRandomLotto)
    this.#data.list = list
    return list
  }
  getWinList(numbers: number[]) {
    const amount = this.#data.list.length
    const winningNumbers = [...numbers]
    if (!this.#isLottoValid(winningNumbers, 7)) return false
    const bonusNumber = winningNumbers.pop() as number

    const res: WinningList = this.#data.list.reduce(
      (p, c) => {
        const matched = winningNumbers.filter(num => c.includes(+num)) || []
        const bonusMatched = matched.length === 5 && c.includes(+bonusNumber)
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
          (Object.entries(GRADES).reduce((p, [g, { winPrice }]) => {
            console.log({ winPrice, winning: res[g], res: winPrice * res[g] })
            return p + winPrice * res[g]
          }, 0) -
            amount * UNIT_PRICE)) /
        (amount * UNIT_PRICE),
    }
  }
}

export default new LottoModel()
