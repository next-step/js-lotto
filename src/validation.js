export function isPositiveIntegerArray(arr) {
  return (
    Array.isArray(arr) && arr.every((num) => Number.isInteger(num) && num > 0)
  );
}

export function isPositiveInteger(num) {
  return Number.isInteger(num) && num > 0;
}

export function isDuplicateNumbersInArray(winningNumbers, bonusNumber) {
  return winningNumbers.includes(bonusNumber);
}
