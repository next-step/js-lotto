import LottoGame from "./domain/LottoGame.js";
import LottoPrizes from "./domain/LottoPrizes.js";
import DrawNumbers from "./domain/DrawNumbers.js";

import { getPurchaseAmount, getDrawNumbers } from "./view/input-controller.js";
import {
  handlePrintPurchaseResult,
  handlePrintLottoResult,
} from "./view/output-controller.js";

async function run() {
  const purchaseAmount = await getPurchaseAmount();

  const lottoGame = new LottoGame(new LottoPrizes());
  const purchasedLottos = lottoGame.purchase(purchaseAmount);

  const quantity = purchasedLottos.length;

  handlePrintPurchaseResult(quantity, purchasedLottos);

  const { winningNumbers, bonusNumber } = await getDrawNumbers();
  const drawNumbers = new DrawNumbers({ winningNumbers, bonusNumber });

  const results = lottoGame.draw(drawNumbers);
  const returnRate = lottoGame.getReturnRate();

  handlePrintLottoResult(results, returnRate);
}

run();
