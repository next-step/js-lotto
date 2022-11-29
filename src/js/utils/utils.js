export function createRandomNumber(maxNumber = 1) {
  return Math.floor(Math.random() * maxNumber + 1);
}

export function checkIsSameElementInArray(array) {
  const set = new Set();

  return array.some((el) => {
    if (set.has(el)) {
      return true;
    }

    set.add(el);
    return false;
  });
}
