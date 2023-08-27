import { createLottoNumberObject } from '../utils/format.js'
import {
  generateLottoNumbers,
  generateUniqExtraNumber,
} from '../utils/generateLottoNumbers.js'

class Lotto {
  #status
  #numbers

  constructor() {
    const selectedNums = generateLottoNumbers()
    const extraNum = generateUniqExtraNumber(selectedNums)

    this.#numbers = createLottoNumberObject({ selectedNums, extraNum })
  }

  setStatus(winningNumbers) {
    const { selectedNums, extraNum } = this.#numbers

    // winningNumbers.selectedNums 와 selectedNums 비교
    const winningSelectdNumsSet = new Set(winningNumbers.selectedNums)
    const matchSelectedNums = selectedNums.reduce((acc, cur) => {
      if (winningSelectdNumsSet.has(cur)) return (acc += 1)
      return acc
    }, 0)

    // winningNumbers.extraNum 과 extraNum 비교
    const matchExtraNum = extraNum === winningNumbers.extraNum ? 1 : 0

    // status 산출
    const status = {
      matchSelectedNums,
      matchExtraNum,
    }

    this.#status = status
  }

  get status() {
    return this.#status
  }

  get numbers() {
    return this.#numbers
  }
}

export default Lotto
