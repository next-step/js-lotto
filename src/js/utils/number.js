export const getMatchedNumbersCount = (firstArray, secondArray) =>
  firstArray.reduce((count, value) => (secondArray.includes(value) ? count + 1 : count), 0);
