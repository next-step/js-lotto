import { LOTTO_RANK } from "../domain/lotto-rank.js";
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
  console.log(
    `${LOTTO_RANK.FIFTH.match}개 일치 (${LOTTO_RANK.FIFTH.prize}원) - ${countRank(
      rankList,
      LOTTO_RANK.FIFTH
    )}개`
  );
  console.log(
    `${LOTTO_RANK.FOURTH.match}개 일치 (${
      LOTTO_RANK.FOURTH.prize
    }원) - ${countRank(rankList, LOTTO_RANK.FOURTH)}개`
  );
  console.log(
    `${LOTTO_RANK.THIRD.match}개 일치 (${LOTTO_RANK.THIRD.prize}원) - ${countRank(
      rankList,
      LOTTO_RANK.THIRD
    )}개`
  );
  console.log(
    `${LOTTO_RANK.SECOND.match}개 일치, 보너스 볼 일치 (${
      LOTTO_RANK.SECOND.prize
    }원) - ${countRank(rankList, LOTTO_RANK.SECOND)}개`
  );
  console.log(
    `${LOTTO_RANK.FIRST.match}개 일치 (${LOTTO_RANK.FIRST.prize}원) - ${countRank(
      rankList,
      LOTTO_RANK.FIRST
    )}개`
  );
}

export function printRateOfReturn(rateOfReturn) {
  console.log(`총 수익률은 ${rateOfReturn}%입니다.`);
}

function countRank(rankList, targetRank) {
  return rankList.filter(
    (rank) =>
      rank.match === targetRank.match && rank.hasBonus === targetRank.hasBonus
  ).length;
}
