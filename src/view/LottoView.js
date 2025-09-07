import { LottoGame } from "../domain/LottoGame.js";
import { WinningLotto } from "../domain/WinningLotto.js";
import { commarize } from "../utils/commarize.js";
import { assert } from "../utils/assert.js";

import { View } from "./View.js";

export class LottoView {
  static async getPurchasePrice() {
    while (true) {
      try {
        const purchasePriceInput = await View.read("구입금액을 입력해 주세요.");
        const purchasePrice = Number(purchasePriceInput);
        LottoGame.validateLottoPurchasePrice(purchasePrice);

        return purchasePrice;
      } catch (error) {
        View.log(error.message);
      }
    }
  }

  static async getWinningNumber() {
    while (true) {
      try {
        const winningNumbersInput = await View.read(
          "\n당첨 번호를 입력해 주세요."
        );
        const winningNumber = winningNumbersInput.split(",").map(Number);
        WinningLotto.validateWinningNumber(winningNumber);

        return winningNumber;
      } catch (error) {
        View.log(error.message);
      }
    }
  }

  static async getBonusNumber({ winningNumber }) {
    while (true) {
      try {
        const bonusNumberInput = await View.read(
          "보너스 번호를 입력해 주세요."
        );
        const bonusNumber = Number(bonusNumberInput);
        WinningLotto.validateBonusNumber(bonusNumber);
        assert(
          !winningNumber.includes(bonusNumber),
          "보너스 번호는 당첨번호에 속하지 않는 번호를 입력해주세요."
        );

        return bonusNumber;
      } catch (error) {
        View.log(error.message);
      }
    }
  }

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
