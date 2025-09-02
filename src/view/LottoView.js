import { View } from "./View.js";
import { LOTTO_WINNING_PRICE } from "../constants/lotto.js";
import { commarize } from "../utils/commarize.js";

export class LottoView {
  static printLottoResult({ lottoResult }) {
    View.log("당첨 통계");
    View.log("--------------------");
    View.log(
      `3개 일치 (${commarize(LOTTO_WINNING_PRICE.fifth)}원) - ${
        lottoResult.fifth
      }`
    );
    View.log(
      `4개 일치 (${commarize(LOTTO_WINNING_PRICE.fourth)}원) - ${
        lottoResult.fourth
      }`
    );
    View.log(
      `5개 일치 (${commarize(LOTTO_WINNING_PRICE.third)}원) - ${
        lottoResult.third
      }`
    );
    View.log(
      `5개 일치, 보너스 볼 일치 (${commarize(
        LOTTO_WINNING_PRICE.second
      )}원) - ${lottoResult.second}`
    );
    View.log(
      `6개 일치 (${commarize(LOTTO_WINNING_PRICE.first)}원) - ${
        lottoResult.first
      }`
    );
  }
}
