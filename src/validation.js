export function isValidLottoNumber(num) {
  return Number.isInteger(num) && num >= 1 && num <= 45;
}

export function isValidLottoNumbersArray(arr) {
  return Array.isArray(arr) && arr.every(isValidLottoNumber);
}

export function isDuplicateNumbersInArray(winningNumbers, bonusNumber) {
  return winningNumbers.includes(bonusNumber);
}
