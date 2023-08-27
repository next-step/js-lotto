import { isNumber } from './validator'
import { ERROR_MESSAGE } from '../constants/message'

export const generateRandomNumber = (maxNumber = 100) => {
  if (!isNumber(maxNumber)) {
    throw new Error(ERROR_MESSAGE.INVALID_NUMBER)
  }

  return Math.trunc(Math.random() * maxNumber)
}
