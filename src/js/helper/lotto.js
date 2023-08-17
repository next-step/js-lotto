import { DEFAULT_PRICE } from '../constants/lotto'
import { isNumber } from '../utils/validator'
import { generateRandomNumber } from '../utils/number'

export const getCountOfPurchase = (amount, price = DEFAULT_PRICE) => {
  if (!isNumber(amount) || !isNumber(price)) {
    throw new Error('올바른 숫자가 아닙니다!')
  }

  if (amount < price) {
    return 0
  }

  return Math.trunc(amount / price)
}

export const generateLotto = () => {
  const numberList = new Set()

  while (numberList.size < 6) {
    const randomNum = generateRandomNumber(45)

    if (randomNum > 0) {
      numberList.add(randomNum)
    }
  }

  return [...numberList]
}

export const getMatchCount = (winNumberList, lotto) => {
  return lotto.filter(number => winNumberList.includes(number)).length
}

export const hasBonusMatch = (bonusNumber, lotto) => lotto.includes(bonusNumber)
