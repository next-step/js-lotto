export const splitNumbers = stringNumbers => {
  const numbers = stringNumbers.split(',').map(number => Number.parseFloat(number));

  return numbers.filter(number => !Number.isNaN(number));
};
