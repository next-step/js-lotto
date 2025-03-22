import LottoGame from "./domain/LottoGame.js";
import LottoPrizes from "./domain/LottoPrizes.js";
import DrawNumbers from "./domain/DrawNumbers.js";
import WinningNumbers from "./domain/WinningNumbers.js";
import BonusNumbers from "./domain/BonusNumbers.js";

import {
  getPurchaseAmount,
  getWinningNumbers,
  getBonusNumber,
  getRestart,
} from "./view/console/input-controller.js";
import {
  handlePrintPurchaseResult,
  handlePrintLottoResult,
} from "./view/console/output-controller.js";

import { retryOnError } from "./utils/retryHandler.js";

async function purchaseLottos(lottoGame) {
  return await retryOnError(async () => {
    const purchaseAmount = await getPurchaseAmount();
    return lottoGame.purchase(purchaseAmount);
  });
}

async function getDrawNumbers() {
  const winningNumbers = await retryOnError(async () => {
    return new WinningNumbers({
      numbers: await getWinningNumbers(),
    });
  });

  const bonusNumbers = await retryOnError(async () => {
    return new BonusNumbers({
      numbers: await getBonusNumber(),
    });
  });

  return new DrawNumbers({
    winningNumbers,
    bonusNumbers,
  });
}

async function run() {
  const lottoGame = new LottoGame(new LottoPrizes());

  const purchasedLottos = await purchaseLottos(lottoGame);
  const quantity = purchasedLottos.length;

  handlePrintPurchaseResult(quantity, purchasedLottos);

  const drawNumbers = await getDrawNumbers();

  const results = lottoGame.draw(drawNumbers);
  const returnRate = lottoGame.getReturnRate();

  handlePrintLottoResult(results, returnRate);
}

async function startGame() {
  await run();
  const continueGame = await getRestart();

  if (continueGame) {
    startGame();
  }
}

startGame();
