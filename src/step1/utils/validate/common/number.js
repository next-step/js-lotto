export const isValidTypeOfNumber = (value) =>
  !Number.isNaN(value) && Object.prototype.toString.call(value) === '[object Number]';

export const isValidTypeOfNumbers = (values) => !values.some((value) => !isValidTypeOfNumber(value));
