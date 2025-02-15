export const isNumber = (value) =>
  value !== null && value !== undefined && !isNaN(value);

export const isPositiveInteger = (value) =>
  Number.isInteger(value) && value > 0;

export const commaizeNumber = (value) => value.toLocaleString();
