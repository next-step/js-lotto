import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { validatePurchaseAmount } from "../domain/validators/purchaseValidator.js";
import {
  validateBonusNumber,
  validateLottoNumbers,
} from "../domain/validators/lottoValidator.js";
import { validateRestartInput } from "../domain/validators/restartValidator.js";

const handleError = (e) => {
  if (!(e instanceof Error)) return;
  console.log(e.message);
};

const askQuestion = async (questionFn, rl) => {
  try {
    const userInput = await questionFn(rl);
    return userInput;
  } catch (e) {
    handleError(e);
  }
};

const withErrorBoundary = async (questionFn) => {
  const rl = readline.createInterface({ input, output });

  while (true) {
    const userInput = await askQuestion(questionFn, rl);
    if (userInput === undefined) continue;
    rl.close();
    return userInput;
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

export const askToRestartOrExit = async () => {
  return withErrorBoundary(async (readline) => {
    const input = await readline.question("> 다시 시작하시겠습니까? (y/n) ");

    validateRestartInput(input);

    return input;
  });
};
