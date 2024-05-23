import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const readLine = async ({ query, validate, transform }) => {
  const rl = readline.createInterface({ input, output });

  let answer = await rl.question(query + "\n");

  rl.close();

  if (transform) {
    answer = transform(answer);
  }

  if (validate) {
    validate(answer);
  }

  return answer;
};
