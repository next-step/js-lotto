import { ERROR_MESSAGE } from '../../constants/errorMessage.js'
import {
  generateLottoNumbers,
  generateNotDuplicatedExtraNumber,
} from '../utils/generateLottoNumbers.js'
import { validate } from '../utils/validate.js'

class LottoBase {
  numbers
  static SELECTED_NUMS_LENGTH = 6

  constructor(
    selectedNums = generateLottoNumbers(),
    extraNum = generateNotDuplicatedExtraNumber(selectedNums),
  ) {
    const formattedSelectedNums = this.#formatSelectedNums(selectedNums)
    const formattedExtraNum = this.#formatExtraNum(extraNum)
    this.#validate(formattedSelectedNums, formattedExtraNum)

    this.numbers = {
      selectedNums: formattedSelectedNums,
      extraNum: formattedExtraNum,
    }
  }

  #formatSelectedNums(selectedNums) {
    // 배열로 들어왔을 때
    if (Array.isArray(selectedNums)) {
      return selectedNums.map(Number)
    }
    // 문자열로 들어왔을 때
    if (typeof selectedNums === 'string') {
      return selectedNums.split(',')
    }

    return selectedNums
  }

  #formatExtraNum(extraNum) {
    if (typeof extraNum === 'string') {
      return Number(extraNum)
    }

    return extraNum
  }

  #validate(selectedNums, extraNum) {
    const setSelectedNums = new Set(selectedNums)

    if (!validate.length(selectedNums)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMS_LENGTH)
    }

    if (!validate.isNotDuplicated([...selectedNums, extraNum])) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_NUMS)
    }

    if (!validate.numberRange([...selectedNums, extraNum])) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMS_RANGE)
    }
  }
}

export default LottoBase
