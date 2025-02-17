import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const startProgram = () => {
  const rl = readline.createInterface({ input, output });

  return rl;
};

export const read = async (rl, readPayload) => {
  const { message, errorMessage, checkPolicy } = readPayload;

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const answer = await rl.question(message);
    if (checkPolicy(answer)) {
      return answer;
    }
    console.log(errorMessage);
  }
};

export const stopProgram = (rl) => {
  rl.close();
};
