export const splitNumbers = stringNumbers => {
  const numbers = stringNumbers.split(',').map(Number);

  return numbers.filter(number => !Number.isNaN(number));
};
