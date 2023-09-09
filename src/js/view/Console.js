import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export class Console {
  #rl;

  constructor() {
    this.#rl = readline.createInterface({ input, output });
  }

  async #prompt(text) {
    console.log("\n");
    return this.#rl.question(text);
  }

  print(message) {
    console.log(message);
  }

  async getUserInput(message, { parser, maxRetryCount = 10 }) {
    if (!parser) {
      return this.#prompt(message);
    }

    for (let retryCount = 0; retryCount < maxRetryCount; ++retryCount) {
      const userInputStr = await this.#prompt(message);
      try {
        const userInput = parser(userInputStr);
        return userInput;
      } catch (error) {
        this.print(`잘못된 입력입니다: ${error.message}`);
      }
    }

    throw new Error("재입력 허용 횟수 초과");
  }

  close() {
    this.#rl?.close();
  }
}
