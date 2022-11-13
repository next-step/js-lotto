const generateLottoNumbers = () => {
  const numberSet = new Set();
  while (numberSet.size < 6) {
    const generatedNumber = getRandomNumber(45);
    numberSet.add(generatedNumber);
  }
  return [...numberSet];
};

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

export { generateLottoNumbers };
