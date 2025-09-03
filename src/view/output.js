import { LottoRank } from "../domain/lotto-rank.js";
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
 * @param {LottoRank[]} rankList
 */
export function printWinningStatistics(rankList) {
  console.log("당첨 통계");
  console.log("--------------------");
  console.log(
    `${LottoRank.FIFTH.match}개 일치 (${LottoRank.FIFTH.prize}원) - ${countRank(
      rankList,
      LottoRank.FIFTH
    )}개`
  );
  console.log(
    `${LottoRank.FOURTH.match}개 일치 (${
      LottoRank.FOURTH.prize
    }원) - ${countRank(rankList, LottoRank.FOURTH)}개`
  );
  console.log(
    `${LottoRank.THIRD.match}개 일치 (${LottoRank.THIRD.prize}원) - ${countRank(
      rankList,
      LottoRank.THIRD
    )}개`
  );
  console.log(
    `${LottoRank.SECOND.match}개 일치, 보너스 볼 일치 (${
      LottoRank.SECOND.prize
    }원) - ${countRank(rankList, LottoRank.SECOND)}개`
  );
  console.log(
    `${LottoRank.FIRST.match}개 일치 (${LottoRank.FIRST.prize}원) - ${countRank(
      rankList,
      LottoRank.FIRST
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
