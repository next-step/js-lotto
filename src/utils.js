export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function $(selector) {
  return document.querySelector(selector);
}

export function hasDuplicateNumbers(numbers) {
  return new Set(numbers).size !== numbers.length;
}

export function isNumbersOutOfRange({ min, max, targets }) {
  return targets.some((target) => min > target || max < target);
}
