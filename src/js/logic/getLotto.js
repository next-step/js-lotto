import { LOTTO_MAX_NUMBER, LOTTO_DIGITS } from '../constants/index.js';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const generateLotto = (lottoArray, count, numberArray) => {
  if (count === 0) return;

  const tempLottoArray = [];
  const tempLottoNumberArray = [...numberArray];

  for (let i = 0; i < LOTTO_DIGITS; i++) {
    const randomNumber = getRandomInt(LOTTO_MAX_NUMBER - i);
    const lottoNumber = tempLottoNumberArray.splice(randomNumber, 1);
    tempLottoArray.push(lottoNumber[0]);
  }

  lottoArray.push(tempLottoArray);
  generateLotto(lottoArray, count - 1, numberArray);
};

const getLotto = (count, numberArray) => {
  const lottoArray = [];

  generateLotto(lottoArray, count, numberArray);

  return lottoArray;
};

export default getLotto;
