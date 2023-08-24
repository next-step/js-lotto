export const splitToNumberArray = (input, separator = ',') =>
  input
    .split(separator)
    .map((number) => number.trim())
    .map(Number);
