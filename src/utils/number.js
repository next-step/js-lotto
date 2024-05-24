const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateUniqueRandomNumbers = (length, min, max) => {
  const numbers = [];
  while (numbers.length < length) {
    const randomNumber = getRandomNumber(min, max);

    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  return numbers;
};
