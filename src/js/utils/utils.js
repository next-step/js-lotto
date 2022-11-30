export function createRandomNumber(maxNumber = 1) {
  return Math.floor(Math.random() * maxNumber) + 1;
}

export function hasSameElementInArray(array) {
  return new Set(array).size !== array.length
}

export function countSameElementInBothArray(array, otherArray) {
  return array.reduce((prev, curr, i) => {
    if (curr === otherArray[i]) {
      return prev + 1;
    }

    return prev;
  }, 0);
}
