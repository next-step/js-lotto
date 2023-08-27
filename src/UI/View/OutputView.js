import { LOTTO_PRICE } from "../../domain/constant.js";

/**
 * @param {number} profitRate
 * @returns
 */
const ViewProfitRate = profitRate =>
  console.log(`총 수익률: ${profitRate.toFixed(1)}%`);

/**
 * @param {number[][]} buyerLottoList
 */
const ViewBuyerLottoList = buyerLottoList => {
  buyerLottoList.forEach(list => console.log(list));
};

/**
 * @typedef {Object} LottoStats
 * @property {number} firstWinner -  6
 * @property {number} secondWinner - 5 + bonus
 * @property {number} thirdWinner - 5
 * @property {number} fourthWinner - 4
 * @property {number} fifthWinner - 3
 */
const ViewWinnerPriceStats = stats => {
  console.log("당첨 통계");
  console.log("--------------------");

  for (const [rank, count] of Object.entries(stats)) {
    switch (rank) {
      case "firstWinner":
        console.log(
          `6개 일치 (${LOTTO_PRICE.FIRST_WINNER.toLocaleString()}원) - ${count}개`
        );
        break;
      case "secondWinner":
        console.log(
          `5개 일치, 보너스 볼 일치 (${LOTTO_PRICE.SECOND_WINNER.toLocaleString()}원) - ${count}개`
        );
        break;
      case "thirdWinner":
        console.log(
          `5개 일치 (${LOTTO_PRICE.THIRD_WINNER.toLocaleString()}원) - ${count}개`
        );
        break;
      case "fourthWinner":
        console.log(
          `4개 일치 (${LOTTO_PRICE.FOURTH_WINNER.toLocaleString()}원) - ${count}개`
        );
        break;
      case "fifthWinner":
        console.log(
          `3개 일치 (${LOTTO_PRICE.FIFTH_WINNER.toLocaleString()}원) - ${count}개`
        );
        break;
    }
  }
};

const ViewPurchaseMessage = lottoAmount =>
  console.log(lottoAmount + "개를 구매했습니다. \n");

export {
  ViewProfitRate,
  ViewBuyerLottoList,
  ViewWinnerPriceStats,
  ViewPurchaseMessage,
};
