import { SELECTED_NUMS_LENGTH } from '../../constants/conditions.js'

const generateSingleLottoNumber = () => Math.floor(Math.random() * 45) + 1

export const generateUniqExtraNumber = (selectedNumbers) => {
  const numSet = new Set(selectedNumbers)
  let extraNum = generateSingleLottoNumber()

  while (numSet.has(extraNum)) {
    extraNum = generateSingleLottoNumber()
  }

  return extraNum
}

export const generateLottoNumbers = (count = SELECTED_NUMS_LENGTH) => {
  const randomNumbers = new Set()

  while (randomNumbers.size < count) {
    const number = generateSingleLottoNumber()

    if (!randomNumbers.has(number)) {
      randomNumbers.add(number)
    }
  }

  return [...randomNumbers].sort((a, b) => a - b)
}
