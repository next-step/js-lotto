import { LOTTO_NUMBER_UNIT, LOTTO_SIZE } from './constants.js';

const createRandomNumber = () => {
  const { min, max } = LOTTO_NUMBER_UNIT;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const sortLottoNumbers = (lottoNumberArray) => lottoNumberArray.sort((a, b) => a - b);

const createLotto = () => {
  const lottoSet = new Set();

  while (lottoSet.size < LOTTO_SIZE) {
    lottoSet.add(createRandomNumber());
  }

  return sortLottoNumbers([...lottoSet]);
};

const createLottoList = (count) => {
  const lottoListArray = [];
  for (let i = 0; i < count; i++) {
    lottoListArray.push(createLotto());
  }
  return lottoListArray;
};
export default createLottoList;
