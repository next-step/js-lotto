import { LOTTO } from "../constants.js";
import { getOneRandomNumber } from "../utils/random-utils.js";

export default function LottoGenerator() {
  function getRandomNumbers(min, max) {
    const randomNumbers = new Set();
    while (randomNumbers.size < LOTTO.LOTTO_COUNT_PER_ONE_TICKET) {
      randomNumbers.add(getOneRandomNumber(min, max));
    }
    return randomNumbers;
  }

  function generateRandomNumbers({ moneyAmount, min, max }) {
    const randomNumberArray = [];
    const lottoCnt = Math.floor(moneyAmount / LOTTO.LOTTO_PRICE_PER_ONE_TICKET);

    while (randomNumberArray.length < lottoCnt) {
      const randomNumSet = getRandomNumbers(min, max);
      randomNumberArray.push(randomNumSet);
    }
    return [randomNumberArray, lottoCnt];
  }

  return generateRandomNumbers;
}
