import { ERROR_MESSAGE } from '../../constants/errorMessage.js'
import { convertStringToNumber, convertToNumberArray } from '../utils/format.js'
import {
  generateLottoNumbers,
  generateUniqExtraNumber,
} from '../utils/generateLottoNumbers.js'
import { validate } from '../utils/validate.js'

class LottoBase {
  numbers
  static SELECTED_NUMS_LENGTH = 6

  constructor(
    selectedNums = generateLottoNumbers(),
    extraNum = generateUniqExtraNumber(selectedNums),
  ) {
    const formattedSelectedNums = convertToNumberArray(selectedNums)
    const formattedExtraNum = convertStringToNumber(extraNum)
    this.#validate(formattedSelectedNums, formattedExtraNum)

    this.numbers = {
      selectedNums: formattedSelectedNums,
      extraNum: formattedExtraNum,
    }
  }

  #validate(selectedNums, extraNum) {
    const setSelectedNums = new Set(selectedNums)

    if (!validate.length(selectedNums)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMS_LENGTH)
    }

    if (validate.isDuplicated([...selectedNums, extraNum])) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_NUMS)
    }

    if (!validate.numberRange([...selectedNums, extraNum])) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMS_RANGE)
    }
  }
}

export default LottoBase
