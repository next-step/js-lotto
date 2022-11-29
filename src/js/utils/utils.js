export function createRandomNumber(maxNumber = 1) {
  return Math.floor(Math.random() * maxNumber) + 1;
}

export function hasSameElementInArray(array) {
  return new Set(array).size !== array.length
}
