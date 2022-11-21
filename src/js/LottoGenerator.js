import { LOTTO_PRICE_PER_ONE, LOTTO_COUNT_PER_ONE } from "./constants.js";

export default function LottoGenerator() {
  function getOneRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomNumbers(min, max) {
    const randomNumbers = new Set();
    while (randomNumbers.size < LOTTO_COUNT_PER_ONE) {
      randomNumbers.add(getOneRandomNumber(min, max));
    }
    console.log(randomNumbers);
    return randomNumbers;
  }

  function generateRandomNumbers({ moneyAmount, min, max }) {
    const randomNumberArray = [];
    const lottoCnt = Math.floor(moneyAmount / LOTTO_PRICE_PER_ONE);

    // setMoneyCount(moneyAmount);
    while (randomNumberArray.length < lottoCnt) {
      const randomNumSet = getRandomNumbers(min, max);
      randomNumberArray.push(randomNumSet);
    }
    return [randomNumberArray, lottoCnt];
  }

  return generateRandomNumbers;
}
