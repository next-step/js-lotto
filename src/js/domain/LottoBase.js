import { ERROR_MESSAGE } from '../../constants/errorMessage.js'
import {
  generateLottoNumbers,
  generateNotDuplicatedExtraNumber,
} from '../utils/generateLottoNumbers.js'

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

    // selectedNums 가 당첨번호 길이 조건을 만족하는지
    if (setSelectedNums.size !== LottoBase.SELECTED_NUMS_LENGTH) {
      throw new Error(ERROR_MESSAGE.INVALID_SELECTED_NUMS)
    }
    // selectedNums 에 중복은 없는지
    if (setSelectedNums.size !== selectedNums.length) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_SELECTED_NUMS)
    }
    // selectedNums 의 각 번호가 범위와 일치하는지
    if (
      !selectedNums.every(
        (num) => typeof num === 'number' && 1 <= num && num <= 45,
      )
    ) {
      throw new Error(ERROR_MESSAGE.INVALID_SELECTED_NUMS)
    }
    // selectedNums 와 extraNum이 중복되지 않는지
    if (setSelectedNums.has(extraNum)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_EXTRA_NUMS)
    }
    // extraNum이 1 ~ 45 의 범위 내에 있는지
    if (!(typeof extraNum === 'number' && 1 <= extraNum && extraNum <= 45)) {
      throw new Error(ERROR_MESSAGE.INVALID_EXTRA_NUM)
    }
  }
}

export default LottoBase
