import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const createReadlineInterface = () => {
  return readline.createInterface({ input, output });
};

export const getPurchaseAmount = async (readline) => {
  const line = await readline.question("> 구입금액을 입력해 주세요. ");
  return line;
};
