import Lotto from "./domain/Lotto.js";

import {
  inputPurchaseAmount,
  inputWinningNumber,
  inputBonusNumber,
} from "./view/input.js";
import { printPurchaseResult } from "./view/output.js";

async function run() {
  const purchaseAmount = await inputPurchaseAmount();

  const lotto = new Lotto();
  const purchasedLottos = lotto.purchase(purchaseAmount);

  printPurchaseResult(purchasedLottos.length, purchasedLottos);

  const winningNumber = await inputWinningNumber();
  const bonusNumber = await inputBonusNumber();
}

run();
