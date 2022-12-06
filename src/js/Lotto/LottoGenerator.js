import { LOTTO } from "../constants.js";
import { getOneRandomNumber } from "../utils/random-utils.js";

const getRandomNumbers = ({
  min = 1,
  max = 45,
  count = LOTTO.LOTTO_COUNT_PER_ONE_TICKET,
}) => {
  const randomNumbers = new Set();
  while (randomNumbers.size < count) {
    randomNumbers.add(getOneRandomNumber(min, max));
  }
  return randomNumbers;
};

const generateLottoRandomNumbers = ({ moneyAmount, min, max }) => {
  const randomNumberArray = [];
  const lottoCnt = Math.floor(moneyAmount / LOTTO.LOTTO_PRICE_PER_ONE_TICKET);

  while (randomNumberArray.length < lottoCnt) {
    const randomNumSet = getRandomNumbers({});
    randomNumberArray.push(randomNumSet);
  }
  return [randomNumberArray, lottoCnt];
};

export { generateLottoRandomNumbers, getRandomNumbers };
