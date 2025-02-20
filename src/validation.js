export function isValidNumberInRange(num, range) {
  return Number.isInteger(num) && num >= range.min && num <= range.max;
}

export function isValidNumberArray(arr, range) {
  return (
    Array.isArray(arr) && arr.every((num) => isValidNumberInRange(num, range))
  );
}

export function isValueInArray(arr, value) {
  return arr.includes(value);
}

export function isDuplicateNumbersInArray(numbers) {
  const uniqueNumbers = new Set(numbers);
  return uniqueNumbers.size !== numbers.length;
}

export function isValidPurchaseAmount(amount, unit) {
  return Number.isInteger(amount) && amount > 0 && amount % unit === 0;
}
