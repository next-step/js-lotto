import { LOTTO_NUMBER_UNIT, LOTTO_SIZE } from './constants.js';

// NOTE: !includes push 방식은 배열을 순회하면서 비교하며 일치하는 값이 있는지 검색 성능상의 문제가 있을 수 있음 Set으로 작업.
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

  return sortLottoNumbers(Array.from(new Set(lottoSet)));
};

const createLottoList = (count) => {
  const lottoListArray = [];
  for (let i = 0; i < count; i++) {
    lottoListArray.push(createLotto());
  }
  return lottoListArray;
};
export default createLottoList;
