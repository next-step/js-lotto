export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

export const createUniqueNumbers = (count, getNumber) => {
  const numbers = new Set();

  while (numbers.size < count) {
    numbers.add(getNumber());
  }

  return [...numbers];
};
