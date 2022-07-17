export const isNumber = (value) => {
  return typeof value === "number" && !Number.isNaN(value);
};

export const isDivisible = (numerator, denominator) => {
  return numerator % denominator === 0;
};
