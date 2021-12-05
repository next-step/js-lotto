import { LOTTO, LOTTO_PRICE } from '../constant/lotto.js';
import { getRandomNumber } from '../util/random.js';

const generateLottoNumber = () => getRandomNumber(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER);

export const issueLotto = () => [...Array(LOTTO.NUMBER_AMOUNT)].map(generateLottoNumber);

export const getLottoAmount = (price) => Math.floor(price / LOTTO_PRICE);

export const isAnswerValid = (answer) => {
  const answerValues = Object.values(answer);

  return (
    answerValues.every(
      (inputNumber) =>
        inputNumber && inputNumber >= LOTTO.MIN_NUMBER && inputNumber <= LOTTO.MAX_NUMBER
    ) && [...new Set(answerValues)].length === answerValues.length
  );
};
