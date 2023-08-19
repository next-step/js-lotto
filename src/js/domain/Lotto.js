import {
  generateLottoNumbers,
  generateNotDuplicatedExtraNumber,
} from '../utils/generateLottoNumbers.js'

class Lotto {
  #numbers
  #status

  constructor() {
    const selectedNums = generateLottoNumbers()
    const extraNum = generateNotDuplicatedExtraNumber(selectedNums)

    this.#numbers = {
      selectedNums: selectedNums,
      extraNum: extraNum,
    }

    this.#status = {}
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

  get numbers() {
    return this.#numbers
  }

  get status() {
    return this.#status
  }
}

export default Lotto
