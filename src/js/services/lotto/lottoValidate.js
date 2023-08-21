import { isNumber, isInRange } from '../../utils/validator'
import { DEFAULT_PRICE } from '../../constants/lotto'
import { ERROR_MESSAGE } from '../../constants/message'

export const isInLottoRange = num => isInRange(num, 1, 45)

export const checkPayment = payment => {
  if (!isNumber(payment)) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_PAYMENT_TYPE)
  }

  if (payment < DEFAULT_PRICE) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_PAYMENT)
  }
}

export const checkBonusNumber = (bonusNumber, winNumberList) => {
  if (!isNumber(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_BONUS_NUMBER_TYPE)
  }

  if (!isInLottoRange(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_BONUS_NUMBER_RANGE)
  }

  if (winNumberList.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_LOTTO_BONUS_NUMBER)
  }
}

export const checkValidWinNumberList = winNumberText => {
  const winNumberList = winNumberText.split(',').map(num => Number(num))
  const uniqueWinNumberList = new Set(winNumberList)

  const isValidType = winNumberList.every(num => isNumber(num))
  if (!isValidType) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_WIN_NUMBER_TYPE)
  }

  if (uniqueWinNumberList.size !== 6) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_LOTTO_WIN_NUMBER)
  }

  const hasValidNumber = winNumberList.every(isInLottoRange)
  if (!hasValidNumber) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_WIN_NUMBER_RANGE)
  }
}
