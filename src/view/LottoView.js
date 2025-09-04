import { View } from "./View.js";
import { commarize } from "../utils/commarize.js";

export class LottoView {
  static printLottoResult({ lottoResult, lottoRank }) {
    View.log("당첨 통계");
    View.log("--------------------");
    View.log(
      `3개 일치 (${commarize(lottoRank.FIFTH.PRIZE)}원) - ${lottoResult.fifth}`
    );
    View.log(
      `4개 일치 (${commarize(lottoRank.FOURTH.PRIZE)}원) - ${
        lottoResult.fourth
      }`
    );
    View.log(
      `5개 일치 (${commarize(lottoRank.THIRD.PRIZE)}원) - ${lottoResult.third}`
    );
    View.log(
      `5개 일치, 보너스 볼 일치 (${commarize(lottoRank.SECOND.PRIZE)}원) - ${
        lottoResult.second
      }`
    );
    View.log(
      `6개 일치 (${commarize(lottoRank.FIRST.PRIZE)}원) - ${lottoResult.first}`
    );
  }
}
