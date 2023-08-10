export const print = (str) => {
  console.log(str);
};

export const getRandomNumber = (min, max, excludedNumbers = []) => {
  let randomNumber = null;

  while (!randomNumber) {
    const candidate = Math.floor(Math.random() * (max - min + 1)) + min;
    if (excludedNumbers.indexOf(candidate) === -1) {
      randomNumber = candidate;
    }
  }

  return randomNumber;
};
