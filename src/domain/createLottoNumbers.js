const LOTTO_NUMBER_COUNT = 6;
const MAX_LOTTO_NUMBER = 45;

export const createLottoNumbers = () => {
  const lottoNumbers = createUniqueNumbers().sort((a, b) => a - b);
  return lottoNumbers;
};

const createUniqueNumbers = () => {
  const numbers = new Set();
  while (numbers.size < LOTTO_NUMBER_COUNT) {
    numbers.add(getRandomLottoNumber());
  }
  return [...numbers];
};

const getRandomLottoNumber = () => {
  return Math.floor(Math.random() * MAX_LOTTO_NUMBER) + 1;
};
