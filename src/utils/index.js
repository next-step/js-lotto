export const isNumber = (value) =>
  value !== null && value !== undefined && !isNaN(value);

export const isPositiveInteger = (value) =>
  Number.isInteger(value) && value > 0;

export const isArrayDifference = (array1, array2) =>
  array1.length === array2.length &&
  array1.every((value, index) => value === array2[index]);

export const hasDuplicateNumber = (numbers) =>
  numbers.length !== new Set(numbers).size;

export const commaizeNumber = (value) => value.toLocaleString();

export const shuffle = (numbers) =>
  [...numbers].sort(() => Math.random() - 0.5);
