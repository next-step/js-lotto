import { View } from "./View.js";
import { commarize } from "../utils/commarize.js";

export class LottoView {
  static printLottoResult({ lottoResult, lottoRank }) {
    View.log("당첨 통계");
    View.log("--------------------");
    View.log(
      `3개 일치 (${commarize(lottoRank.FIFTH.value.prize)}원) - ${
        lottoResult.fifth
      }`
    );
    View.log(
      `4개 일치 (${commarize(lottoRank.FOURTH.value.prize)}원) - ${
        lottoResult.fourth
      }`
    );
    View.log(
      `5개 일치 (${commarize(lottoRank.THIRD.value.prize)}원) - ${
        lottoResult.third
      }`
    );
    View.log(
      `5개 일치, 보너스 볼 일치 (${commarize(
        lottoRank.SECOND.value.prize
      )}원) - ${lottoResult.second}`
    );
    View.log(
      `6개 일치 (${commarize(lottoRank.FIRST.value.prize)}원) - ${
        lottoResult.first
      }`
    );
  }
}
