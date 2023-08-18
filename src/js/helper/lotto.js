import { DEFAULT_PRICE, LOTTO_PRIZE, LOTTO_RANK } from '../constants/lotto'
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

export const getLottoResult = (winNumberList, bonusNumber, lottoList) => {
  return lottoList.reduce((acc, lotto) => {
    const lottoScore = getLottoScore(winNumberList, bonusNumber, lotto)

    if (LOTTO_PRIZE[lottoScore]) {
      acc[lottoScore] = (acc[lottoScore] || 0) + 1
    }

    return acc
  }, {})
}

export const calcTotalPrize = lottoResult =>
  Object.entries(lottoResult).reduce(
    (acc, [key, count]) => acc + LOTTO_PRIZE[key] * count,
    0
  )

export const getReturnRate = (totalPrize, payment) => {
  const TO_PERCENT = 100
  return ((totalPrize / payment) * TO_PERCENT).toFixed(1)
}

const getSortedPrizeEntries = () => {
  const order = [
    LOTTO_RANK.FIFTH,
    LOTTO_RANK.FOURTH,
    LOTTO_RANK.THIRD,
    LOTTO_RANK.SECOND,
    LOTTO_RANK.FIRST
  ]

  return Object.entries(LOTTO_PRIZE).sort(
    (a, b) => order.indexOf(a[0]) - order.indexOf(b[0])
  )
}

export const getLottoStats = lottoResult => {
  const lottoPrizeEntires = getSortedPrizeEntries()

  return lottoPrizeEntires.map(([key, prize]) => {
    const rank = key === '5+' ? '5개 일치, 보너스 볼 일치' : `${key}개 일치`
    const matchCount = lottoResult[key] || 0

    return `${rank} (${prize.toLocaleString()}원) - ${matchCount}개`
  })
}
