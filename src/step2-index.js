import LottoGame from "./domain/LottoGame.js";
import LottoPrizes from "./domain/LottoPrizes.js";
import DrawNumbers from "./domain/DrawNumbers.js";
import WinningNumbers from "./domain/WinningNumbers.js";
import BonusNumbers from "./domain/BonusNumbers.js";

import {
  getPurchaseAmount,
  getDrawNumbers,
  showResult,
  resetPurchase,
} from "./view/web/view-controller.js";

window.addEventListener("load", async () => {
  const lottoGame = new LottoGame(new LottoPrizes());

  getPurchaseAmount((purchaseAmount) => {
    const purchasedLottos = lottoGame.purchase(purchaseAmount);
    return purchasedLottos;
  });

  getDrawNumbers((winningNumbers, bonusNumbers) => {
    const drawNumbers = new DrawNumbers({
      winningNumbers: new WinningNumbers({ numbers: winningNumbers }),
      bonusNumbers: new BonusNumbers({ numbers: bonusNumbers }),
    });

    const results = lottoGame.draw(drawNumbers);

    showResult({
      rate: lottoGame.getReturnRate(),
      result: results,
      onClick: () => {
        resetPurchase();
      },
    });
  });
});
