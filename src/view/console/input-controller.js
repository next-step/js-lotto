import {
  inputPurchaseAmount,
  inputWinningNumber,
  inputBonusNumber,
  inputRestart,
} from "./input.js";

export async function getPurchaseAmount() {
  const purchaseAmountInput = await inputPurchaseAmount();
  return Number(purchaseAmountInput);
}

export async function getWinningNumbers() {
  const winningNumberInput = await inputWinningNumber();
  return winningNumberInput.split(",").map((number) => Number(number.trim()));
}

export async function getBonusNumber() {
  const bonusNumberInput = await inputBonusNumber();
  return bonusNumberInput.split(",").map((number) => Number(number.trim()));
}

export async function getRestart() {
  const restartInput = await inputRestart();
  return restartInput.toLowerCase() === "y";
}
