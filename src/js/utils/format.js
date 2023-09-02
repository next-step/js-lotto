export const convertToNumberArray = (input) => {
  // 배열로 들어왔을 때
  if (Array.isArray(input) && input.map(Number).every(Number.isFinite)) {
    return input.map(Number)
  }
  // 문자열로 들어왔을 때
  if (typeof input === 'string') {
    return input.split(',').map(Number)
  }

  return input
}

export const convertStringToNumber = (input) => {
  if (typeof input === 'string') {
    return Number(input)
  }
  return input
}

export const createLottoNumberObject = ({ selectedNums, extraNum }) => {
  return {
    selectedNums,
    extraNum,
  }
}
