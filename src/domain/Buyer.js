import { LOTTO_PRICE, LOTTO_RULES } from "./constant.js";
import { dataStorage } from "./data.js";

// Buyer: generate numbers, calculate profit
export const Buyer = {
  /**
   * @param {number} count - 생성할 로또 리스트 개수
   * @returns {number[][]} - 생성된 로또 번호 리스트 배열
   */
  generateLottoList(count) {
    const lottoLists = [];

    while (0 < count) {
      const lottoList = _generateLottoNumbers();
      lottoLists.push(lottoList);
      count--;
    }

    const sortedLottoLists = lottoLists.map(list => list.sort((a, b) => a - b));
    dataStorage.buyerLottoList = sortedLottoLists;

    return dataStorage.buyerLottoList;
  },

  // 수익률 (%) = ((총 상금 - 총 구매 비용) / 총 구매 비용) * 100
  calculateLottoProfit() {
    const totalWinPrice =
      dataStorage.lottoStats.firstWinner * LOTTO_PRICE.FIRST_WINNER +
      dataStorage.lottoStats.secondWinner * LOTTO_PRICE.SECOND_WINNER +
      dataStorage.lottoStats.thirdWinner * LOTTO_PRICE.THIRD_WINNER +
      dataStorage.lottoStats.fourthWinner * LOTTO_PRICE.FOURTH_WINNER +
      dataStorage.lottoStats.fifthWinner * LOTTO_PRICE.FIFTH_WINNER;

    const totalPurchaseCost =
      dataStorage.buyerLottoList.length * LOTTO_PRICE.PRICE;

    const profitRate =
      ((totalWinPrice - totalPurchaseCost) / totalPurchaseCost) * 100;

    return profitRate;
  },
};

const _generateLottoNumbers = () => {
  const numberList = new Set();

  while (numberList.size < LOTTO_RULES.LOTTO_BALLS) {
    const randomNum = _generateRandomNumber(
      LOTTO_RULES.LOTTO_MIN_NUMBER,
      LOTTO_RULES.LOTTO_MAX_NUMBER
    );

    if (randomNum >= LOTTO_RULES.LOTTO_MIN_NUMBER) {
      numberList.add(randomNum);
    }
  }

  return Array.from(numberList);
};

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const _generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
