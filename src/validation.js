export function isValidLottoNumber(num, range) {
  return Number.isInteger(num) && num >= range.min && num <= range.max;
}

export function isValidLottoNumbersArray(arr, range) {
  return (
    Array.isArray(arr) && arr.every((num) => isValidLottoNumber(num, range))
  );
}

export function isDuplicateNumbersInArray(winningNumbers, bonusNumber) {
  return winningNumbers.includes(bonusNumber);
}
