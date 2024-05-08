export const hasDuplicateNumbers = (numbers) =>
  new Set(numbers).size !== numbers.length;

export const isNaturalNumber = (num) => Number.isInteger(num) && num > 0;

export const isInRange = (num, min, max) => num >= min && num <= max;

export const isEqualLength = (arr, length) => {
  return arr.length === length;
};
