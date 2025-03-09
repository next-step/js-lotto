import {
  inputPurchaseAmount,
  inputWinningNumber,
  inputBonusNumber,
} from "./input.js";

export async function getPurchaseAmount() {
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

export async function getDrawNumbers() {
  const winningNumbers = await getWinningNumbers();
  const bonusNumber = await getBonusNumber();

  return { winningNumbers, bonusNumber };
}
