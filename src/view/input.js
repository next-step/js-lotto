import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const createReadlineInterface = () => {
  return readline.createInterface({ input, output });
};

export const getPurchaseAmount = async (readline) => {
  const line = await readline.question("> 구입금액을 입력해 주세요. ");

  const purchaseAmount = Number(line.trim());
  return purchaseAmount;
};

export const getWinningNumbers = async (readline) => {
  const line = await readline.question("> 당첨 번호를 입력해 주세요. ");

  const winningNumbers = line.split(",").map(Number);
  return winningNumbers;
};

export const getBonusNumber = async (readline) => {
  const line = await readline.question("\n> 보너스 번호를 입력해 주세요. ");

  const bonusNumber = Number(line.trim());
  return bonusNumber;
};
