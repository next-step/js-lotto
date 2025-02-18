import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { validatePurchaseAmount } from "../domain/validators/purchaseValidator.js";
import {
  validateBonusNumber,
  validateLottoNumbers,
} from "../domain/validators/lottoValidator.js";

const withErrorBoundary = async (questionFn) => {
  const rl = readline.createInterface({ input, output });

  while (true) {
    try {
      const userInput = await questionFn(rl);
      rl.close();
      return userInput;
    } catch (e) {
      if (!(e instanceof Error)) return;
      console.log(e.message);
    }
  }
};

export const getPurchaseAmount = () => {
  return withErrorBoundary(async (readline) => {
    const line = await readline.question("> 구입금액을 입력해 주세요. ");

    const purchaseAmount = Number(line.trim());

    validatePurchaseAmount(purchaseAmount);

    return purchaseAmount;
  });
};

export const getWinningNumbers = () => {
  return withErrorBoundary(async (readline) => {
    const line = await readline.question("> 당첨 번호를 입력해 주세요. ");

    const winningNumbers = line.split(",").map(Number);

    validateLottoNumbers(winningNumbers);

    return winningNumbers;
  });
};

export const getBonusNumber = (winningNumbers) => {
  return withErrorBoundary(async (readline) => {
    const line = await readline.question("\n> 보너스 번호를 입력해 주세요. ");

    const bonusNumber = Number(line.trim());

    validateBonusNumber(winningNumbers, bonusNumber);

    return bonusNumber;
  });
};
