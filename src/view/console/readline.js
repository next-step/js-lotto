import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const startProgram = () => {
  const rl = readline.createInterface({ input, output });

  return rl;
};

export const read = async (rl, message) => {
  const answer = await rl.question(message);
  return answer;
};

export const stopProgram = (rl) => {
  rl.close();
};
