const isPositiveNumber = (number) => number > 0;

const isRemainderZero = (number, unit) => {
  if (number % unit === 0) return true;

  return false;
};

export const validation = {
  isPositiveNumber,
  isRemainderZero,
};
