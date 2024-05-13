export function generateRandomNumbers(range, radix) {
  return parseInt(Math.random() * range, radix);
}

export function numberOfDuplicateArrays(lottos, targetValue) {
  return lottos.filter((lotto) => lotto.result === targetValue).length;
}
