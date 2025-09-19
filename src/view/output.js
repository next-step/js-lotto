import { LOTTO_RANK, summarizeRank } from "../domain/lotto-rank.js";
import { Lotto } from "../domain/lotto.js";

/**
 *
 * @param {Lotto[]} lottoList
 */
export function printLotto(lottoList) {
  console.log(`${lottoList.length}개를 구매했습니다.`);
  lottoList.forEach((lotto) => {
    console.log(`[${lotto.text().join(", ")}]`);
  });
}

/**
 *
 * @param {LOTTO_RANK[]} rankList
 */
export function printWinningStatistics(rankList) {
  console.log("당첨 통계");
  console.log("--------------------");

  const rankSummary = summarizeRank(rankList);
  rankSummary.forEach(({ rank, count }) => {
    console.log(`${rank.match}개 일치 (${rank.prize}원) - ${count}개`);
  });
}

export function printRateOfReturn(rateOfReturn) {
  console.log(`총 수익률은 ${rateOfReturn}%입니다.`);
}
