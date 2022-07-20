export const isNumber = (value) => {
  return typeof value === "number" && !Number.isNaN(value);
};

export const isDivisible = (numerator, denominator) => {
  return numerator % denominator === 0;
};

export const isLottoNumber = (value) => {
  return Number.isInteger(value) && 0 < value && value < 46;
};

export const isDuplicated = (...args) => {
  return args.length !== new Set(args).size;
};
