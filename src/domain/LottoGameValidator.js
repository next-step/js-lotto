import { commarize } from "../utils/commarize.js";
import { LottoGame } from "./LottoGame.js";

export class LottoGameValidator {
  static validateLottoPurchasePrice(purchasePrice) {
    if (purchasePrice % LottoGame.LOTTO_PRICE !== 0) {
      throw new Error(
        `로또 구입 금액은 ${commarize(
          LottoGame.LOTTO_PRICE
        )}원 단위로 입력해주세요.`
      );
    }

    if (typeof purchasePrice !== "number" || Number.isNaN(purchasePrice)) {
      throw new Error("로또 구입 금액은 숫자값을 입력해주세요.");
    }
  }
}
