import readline from "readline";
import {
  checkUserInputValidateForBuyLotto,
  checkUserInputValidateForBonusNumber,
  checkUserInputValidateForWinningNumber,
  checkUserInputValidateForRetry,
} from "./checkValidation.js";

export async function readLineAsync(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const input = await new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });

  checkUserInputValidateForBuyLotto(input);

  return input;
}
export async function getWinningNumbers(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const input = await new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });

  checkUserInputValidateForWinningNumber(input);

  return input;
}

export async function getBonusNumber(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const input = await new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });

  checkUserInputValidateForBonusNumber(input);

  return input;
}
export async function IsUserRetry(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const input = await new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });

  checkUserInputValidateForRetry(input);

  return input;
}
