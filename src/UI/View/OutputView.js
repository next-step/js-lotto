import { LOTTO_PRICE } from "../../domain/constant.js";

/** @type {import('../../../jsdoc_comment.js').RankPriceStatsFunctions}  */
const RANK_PRICE_STATS = {
  firstWinner: count =>
    `6개 일치 (${LOTTO_PRICE.FIRST_WINNER.toLocaleString()}원) - ${count}개`,
  secondWinner: count =>
    `5개 일치, 보너스 볼 일치 (${LOTTO_PRICE.SECOND_WINNER.toLocaleString()}원) - ${count}개`,
  thirdWinner: count =>
    `5개 일치 (${LOTTO_PRICE.THIRD_WINNER.toLocaleString()}원) - ${count}개`,
  fourthWinner: count =>
    `4개 일치 (${LOTTO_PRICE.FOURTH_WINNER.toLocaleString()}원) - ${count}개`,
  fifthWinner: count =>
    `3개 일치 (${LOTTO_PRICE.FIFTH_WINNER.toLocaleString()}원) - ${count}개`,
};

/** @param {number} profitRate */
const ViewProfitRate = profitRate =>
  console.log(`총 수익률: ${profitRate.toFixed(1)}%`);

/** @param {number[][]} buyerLottoList */
const ViewBuyerLottoList = buyerLottoList => {
  buyerLottoList.forEach(list => console.log(list));
};

/** @type {import('../../../jsdoc_comment.js').LottoStats}  */
const ViewWinnerPriceStats = stats => {
  console.log("당첨 통계");
  console.log("--------------------");

  for (const [rank, count] of Object.entries(stats)) {
    console.log(RANK_PRICE_STATS[rank](count));
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
