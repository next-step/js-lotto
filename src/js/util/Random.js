export const getRandomNumber = (min, max) =>
  Math.trunc(Math.random() * (max - min)) + min;
