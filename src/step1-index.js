import Lotto from "./domain/Lotto.js";

import { inputPurchaseAmount } from "./view/input.js";
import { printPurchaseResult } from "./view/output.js";

async function run() {
  const purchaseAmount = await inputPurchaseAmount();

  const lotto = new Lotto();
  const purchasedLottos = lotto.purchase(Number(purchaseAmount));

  printPurchaseResult(purchasedLottos.length, purchasedLottos);
}

run();
