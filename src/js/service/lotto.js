import {
  LOTTO_NUMBER_COUNT,
  LOTTO_PRICE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../constant/lotto.js';
import { getRandomNumber } from '../util/random.js';

const generateLottoNumber = () => getRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER);

export const issueLotto = () => [...Array(LOTTO_NUMBER_COUNT)].map(generateLottoNumber);

export const getLottoAmount = (price) => Math.floor(price / LOTTO_PRICE);

export const isAnswerValid = (answer) => {
  const answerValues = Object.values(answer);

  return (
    answerValues.every(
      (inputNumber) =>
        inputNumber && inputNumber >= MIN_LOTTO_NUMBER && inputNumber <= MAX_LOTTO_NUMBER
    ) && [...new Set(answerValues)].length === answerValues.length
  );
};
