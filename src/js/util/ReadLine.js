import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const readLine = async ({ query, validate, transform }) => {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question(query + "\n");

  rl.close();

  if (validate && !validate(answer)) {
    throw new Error();
  }

  if (transform) {
    return transform(answer);
  }

  return answer;
};
