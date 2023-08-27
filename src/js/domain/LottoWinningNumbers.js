import { SELECTED_NUMS_LENGTH } from '../../constants/conditions.js'
import { ERROR_MESSAGE } from '../../constants/errorMessage.js'
import {
  convertStringToNumber,
  convertToNumberArray,
  createLottoNumberObject,
} from '../utils/format.js'
import { validate } from '../utils/validate.js'

class LottoWinningNumbers {
  #numbers

  constructor({ selectedNums, extraNum }) {
    const formattedSelectedNums = convertToNumberArray(selectedNums)
    const formattedExtraNum = convertStringToNumber(extraNum)

    this.#validate(formattedSelectedNums, formattedExtraNum)

    this.#numbers = createLottoNumberObject({
      selectedNums: formattedSelectedNums,
      extraNum: formattedExtraNum,
    })
  }

  #validate(selectedNums, extraNum) {
    if (!validate.length(selectedNums, SELECTED_NUMS_LENGTH)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMS_LENGTH)
    }

    if (validate.isDuplicated([...selectedNums, extraNum])) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_NUMS)
    }

    if (!validate.numberRange([...selectedNums, extraNum])) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMS_RANGE)
    }
  }

  get numbers() {
    return this.#numbers
  }
}

export default LottoWinningNumbers
