import LottoGame from "./domain/LottoGame.js";
import LottoPrizes from "./domain/LottoPrizes.js";
import DrawNumbers from "./domain/DrawNumbers.js";

import {
  inputPurchaseAmount,
  inputWinningNumber,
  inputBonusNumber,
} from "./view/input.js";
import { printPurchaseResult, printLottoResult } from "./view/output.js";

async function getPurchaseAmount() {
  const purchaseAmountInput = await inputPurchaseAmount();
  return Number(purchaseAmountInput);
}

async function getWinningNumbers() {
  const winningNumberInput = await inputWinningNumber();
  return winningNumberInput.split(",").map((number) => Number(number.trim()));
}

async function getBonusNumber() {
  const bonusNumberInput = await inputBonusNumber();
  return Number(bonusNumberInput);
}

async function getDrawNumbers() {
  const winningNumbers = await getWinningNumbers();
  const bonusNumber = await getBonusNumber();

  return new DrawNumbers({ winningNumbers, bonusNumber });
}

async function run() {
  const purchaseAmount = await getPurchaseAmount();

  const lottoGame = new LottoGame(new LottoPrizes());
  const purchasedLottos = lottoGame.purchase(purchaseAmount);
  const quantity = purchasedLottos.length;

  printPurchaseResult(quantity, purchasedLottos);

  const drawNumbers = await getDrawNumbers();

  const results = lottoGame.draw(drawNumbers);
  const returnRate = lottoGame.getReturnRate();

  printLottoResult(results, returnRate);
}

run();
