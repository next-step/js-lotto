import { DEFAULT_PRICE, LOTTO_RANK } from '../constants/lotto'
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

  return [...numberList].sort((a, b) => a - b)
}

export const getMatchCount = (winNumberList, lotto) => {
  return lotto.filter(number => winNumberList.includes(number)).length
}

export const hasBonusMatch = (bonusNumber, lotto) => lotto.includes(bonusNumber)

export const getLottoScore = (winNumberList, bonusNumber, lotto) => {
  const matchCount = getMatchCount(winNumberList, lotto)

  if (matchCount === 5 && hasBonusMatch(bonusNumber, lotto)) {
    return LOTTO_RANK.SECOND
  }

  return matchCount.toString()
}
