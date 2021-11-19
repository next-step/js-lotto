import { ErrorMsgs, UNIT_PRICE, LottoSet } from './constants.js'

const arrayGen = (size: number, mapper: (val: any, idx: number) => any) => [...Array(size)].map(mapper)
const numbers = arrayGen(45, (_, i) => i + 1)

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

  setPrice(price: number) {
    if (price < UNIT_PRICE) throw Error(ErrorMsgs.MIN_PRICE)
    const amount = Math.floor(price / UNIT_PRICE)
    this.#data.amount = amount
    return amount
  }
  setAllLottoRandom(price: number) {
    const amount = this.setPrice(price)
    const list = arrayGen(amount, buildRandomLotto)
    this.#data.list = list
    return list
  }
}

export default new LottoModel()
