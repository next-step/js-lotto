const generateRandomNumber = (min, max) => Math.floor(Math.random() * max - min + 1) + min;

export const generateRandomNumbersToArray = (min, max, count) => {
  const randomNumberSet = new Set();

  while (randomNumberSet.size < count) {
    const randomNumber = generateRandomNumber(min, max);
    randomNumberSet.add(randomNumber);
  }

  return [...randomNumberSet].sort((a, b) => a - b);
};
