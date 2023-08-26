export const isNaturalNumber = (value) => Number.isInteger(value) && value > 0;

export const getRandomIntegerBetweenMinMax = (min = 1, max = 43) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
