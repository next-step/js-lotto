export function getUniqueRandomNumbers(low, high, count) {
  const result = [];

  while (result.length < count) {
    const number = Math.floor(Math.random() * (high - low + 1)) + low;

    if (result.indexOf(number) > 0) continue;

    result.push(number);
  }

  return result;
}
