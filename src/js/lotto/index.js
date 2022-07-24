import { getDrawNumber } from '../utills/index.js';

import { LOTTO_MAX_NUMBER, LOTTO_DIGITS } from './constants/index.js';

const getLottoNumberArray = () => {
  return Array.from({ length: LOTTO_MAX_NUMBER }, (_, index) => `${index + 1}`);
};

const generateLotto = (quantity, lottoNumberArray, lottoArray = []) => {
  if (quantity === 0) {
    return lottoArray;
  }

  const tempNumberArray = [...lottoNumberArray];

  const lottoText = Array.from({ length: LOTTO_DIGITS }).reduce((lottoString, _, index) => {
    const randomNumber = getDrawNumber(LOTTO_MAX_NUMBER - index, tempNumberArray).join();
    return `${lottoString} ${randomNumber}`;
  }, '');

  lottoArray.push(lottoText);

  return generateLotto(quantity - 1, lottoNumberArray, lottoArray);
};

const getLottoList = (quantity) => {
  const lottoNumberArray = getLottoNumberArray();

  return generateLotto(quantity, lottoNumberArray);
};

export default getLottoList;
