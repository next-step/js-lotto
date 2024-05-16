export function generateRandomNumbers(range, radix) {
  return parseInt(Math.random() * range, radix);
}

export function filterArray(array, targetValue) {
  return array.filter((item) => item.result === targetValue).length;
}
