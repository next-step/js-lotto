import { LottoGame } from "./domain/LottoGame.js";
import { View } from "./view/View.js";
import { LottoView } from "./view/LottoView.js";
import { getPercentage } from "./utils/getPercentage.js";
import { assert } from "./utils/assert.js";
import { LottoShop } from "./domain/LottoShop.js";
import { WinningLotto } from "./domain/WinningLotto.js";

async function main() {
  try {
    const purchasePriceInput = await View.read("구입금액을 입력해 주세요.");
    const purchasePrice = Number(purchasePriceInput);
    LottoGame.validateLottoPurchasePrice(purchasePrice);

    const lottos = LottoShop.buy(purchasePrice);

    View.log(`${purchasePrice / LottoShop.LOTTO_PRICE}개를 구매했습니다.`);

    for (let i = 0; i < lottos.length; i += 1) {
      View.log(lottos[i].value.map((lottoNumber) => lottoNumber.value));
    }

    const winningNumbersInput = await View.read("\n당첨 번호를 입력해 주세요.");
    const winningNumber = winningNumbersInput.split(",").map(Number);

    const bonusNumberInput = await View.read("보너스 번호를 입력해 주세요.");
    const bonusNumber = Number(bonusNumberInput);
    assert(
      !winningNumber.includes(bonusNumber),
      "보너스 번호는 당첨번호에 속하지 않는 번호를 입력해주세요."
    );

    const winningLotto = WinningLotto.of({
      winningNumber,
      bonusNumber,
    });

    const lottoGame = new LottoGame();

    const lottoResult = lottoGame.checkResult({
      lottos,
      winningLotto,
    });

    const rateOfReturn = lottoGame.getRateOfReturn({
      purchasePrice,
      lottoResult,
    });

    LottoView.printLottoResult({
      lottoResult,
      lottoRank: LottoGame.LOTTO_RANK,
    });

    View.log(`총 수익률은 ${getPercentage(rateOfReturn)}%입니다.`);
  } catch (error) {
    View.log(error.message);
  }
}

main();
