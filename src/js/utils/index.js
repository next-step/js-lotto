export const pickRandomIntegerNumber = (start, end) => Math.floor(Math.random() * end) + start;

export const pickRandomNumbers = (start, end, count) => {
  const randomNumbers = new Set();

  while (randomNumbers.size !== count) {
    randomNumbers.add(pickRandomIntegerNumber(start, end));
  }

  return [...randomNumbers];
};
