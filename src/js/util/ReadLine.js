import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const readLine = async (query) => {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question(query);

  rl.close();

  return answer;
};

export const readInteger = async (query) => {
  const input = await readLine(query);
  const inputInt = parseInt(input);

  if (Number.isNaN(inputInt)) {
    throw new Error("This input must be integer");
  }

  return inputInt;
};
