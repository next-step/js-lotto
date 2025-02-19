export function isValidNumberInRange(num, range) {
  return Number.isInteger(num) && num >= range.min && num <= range.max;
}

export function isValidNumberArray(arr, range) {
  return (
    Array.isArray(arr) && arr.every((num) => isValidNumberInRange(num, range))
  );
}

export function isDuplicateNumbersInArray(winningNumbers, bonusNumber) {
  return winningNumbers.includes(bonusNumber);
}

export function isValidPurchaseAmount(amount, unit) {
  return Number.isInteger(amount) && amount > 0 && amount % unit === 0;
}
