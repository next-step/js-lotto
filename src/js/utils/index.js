const generateRandomNumber = (start, end) => Math.floor(Math.random() * end - start + start);

export const generateRandomNumbersToArray = (start, end, count) => {
  const randomNumberSet = new Set();

  while (randomNumberSet.size < count) {
    const randomNumber = generateRandomNumber(start, end);
    randomNumberSet.add(randomNumber);
  }

  return [...randomNumberSet].sort((a, b) => a - b);
};
