const isPositiveNumber = (number) => number > 0;

const isZeroNumber = (number) => number === 0;

const isRemainderZero = (number, unit) => number % unit === 0;

export const validation = {
  isPositiveNumber,
  isZeroNumber,
  isRemainderZero,
};
