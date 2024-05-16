export function generateRandomNumbers(range, radix) {
  return parseInt(Math.random() * range, radix);
}

export function filterArray(array, targetValue) {
  return array.filter((item) => item.result === targetValue).length;
}

export function sortArray(order = 'ASC' | 'DESC', array) {
  return array.sort((a, b) => {
    if (order === 'ASC') {
      return a - b;
    } else if (order === 'DESC') {
      return b - a;
    }
  });
}
