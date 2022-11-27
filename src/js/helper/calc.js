export const getValueList = (domList) => {
  const arrayList = Array.from(domList)
  return arrayList.map((target) => Number(target.value))
}

const getMatchingCnt = (enteredNumberList, winningLotto, bonusNumber) => {
  const matchingArray = enteredNumberList.filter((num1) => winningLotto.some((num2) => num1 === num2))
  const isBonus = winningLotto.some((number) => number === bonusNumber)
  return { matchCnt: matchingArray.length, isBonus }
}

export const getWinningNumberCnt = (enteredNumberList, winningLottoList, bonusNumber) => {
  const winningCnt = {
    three: 0,
    four: 0,
    five: 0,
    fiveBonus: 0,
    six: 0,
  }

  winningLottoList.forEach((list) => {
    const matchInfo = getMatchingCnt(enteredNumberList, list, bonusNumber)

    if (matchInfo.matchCnt === 3) return (winningCnt.three += 1)
    if (matchInfo.matchCnt === 4) return (winningCnt.four += 1)
    if (matchInfo.matchCnt === 5 && matchInfo.isBonus) return (winningCnt.fiveBonus += 1)
    if (matchInfo.matchCnt === 5) return (winningCnt.five += 1)
    if (matchInfo.matchCnt === 6) return (winningCnt.six += 1)
  })

  return winningCnt
}

export const objectToArray = (array) => Object.keys(array).map((idx) => array[idx])

export const getRevenue = (entered, unit) => {
  const revenue = Object.keys(entered)
    .map((key) => entered[key] * unit[key])
    .reduce((a, b) => a + b)
  return revenue
}

export const getRate = (entered, revenue) => Math.floor(revenue / entered)
