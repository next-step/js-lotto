import { isNumber } from './validator'

export const generateRandomNumber = (maxNumber = 100) => {
  if (!isNumber(maxNumber)) {
    throw new Error('올바른 숫자가 아닙니다!')
  }

  return Math.trunc(Math.random() * maxNumber)
}
