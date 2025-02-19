import LottoGame from "./domain/LottoGame.js";

import {
  inputPurchaseAmount,
  inputWinningNumber,
  inputBonusNumber,
} from "./view/input.js";
import { printPurchaseResult, printLottoResult } from "./view/output.js";

async function run() {
  const purchaseAmount = await inputPurchaseAmount();

  const lottoGame = new LottoGame();
  const purchasedLottos = lottoGame.purchase(purchaseAmount);

  const quantity = purchasedLottos.length;
  printPurchaseResult(quantity, purchasedLottos);

  const winningNumber = await inputWinningNumber();
  const bonusNumber = await inputBonusNumber();

  const results = lottoGame.draw(winningNumber, bonusNumber);
  const returnRate = lottoGame.getReturnRate();

  printLottoResult(results, returnRate);
}

run();
